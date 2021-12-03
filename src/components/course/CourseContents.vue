<template>
  <div class="course-contents">
    <div class="breadcrumb">
      <h3
          v-for="(ancestor, idx) in path"
          :key="ancestor.id"
          @click="switchDirectory(ancestor)">
        {{ idx === 0 ? "Home" : ancestor.filename }}
      </h3>
    </div>

    <p v-if="contents.length === 0" class="empty"> This folder is empty </p>
   
    <div v-if="directories.length > 0 || trashExists || showDeleted" class="directories">
      <div class="header"> Folders </div>
      <div class="listing">
        <div
            v-for="dir in directories"
            class="item"
            :key="dir.id"
            >
          <font-awesome-icon 
              class="jj"
              :icon="folderIcon"
              @click="switchDirectory(dir)">
          </font-awesome-icon>
          <span v-if="(userType === 'instructor' && !showDeleted)" class="editdir">
              <font-awesome-icon
                  v-if="userType === 'instructor'"
                  class="clickable"
                  :icon="editIcon"
                  @click="editFolder(dir)">
              </font-awesome-icon>
            </span>
            <span v-else-if="(userType == 'instructor' && showDeleted)" class="editdir">
              <font-awesome-icon
                  v-if="userType === 'instructor'"
                  class="clickable"
                  :icon="restoreIcon"
                  @click="restoreFolder(dir)">
              </font-awesome-icon>
            </span>
          <span>
          {{ dir.filename }}
          </span>
        </div>
        <div v-if="(trashExists || showDeleted) && userType==='instructor'" class="item" :key="trash">
        
          <font-awesome-icon class="trash_item" :icon="trashIcon" @click="showDeleted = !showDeleted"></font-awesome-icon>
          <span>{{ showDeleted ? "Hide Trash" : "Show Trash"}}</span>
        </div>
      </div>
    </div>

    <modal name="edit-folder-modal" height="auto">
      <!-- TODO: add options to edit filename, URL, etc -->
      <div v-if="edittingFolder.folder" class="edit-file-form">
        <h3>{{edittingFolder.folder.filename}}</h3>
        <div class="group">
        <label for="edit-filename"> Name: </label>
        <input id="edit-filename" type="text" v-model="edittingFolder.newFoldername">
        </div>
        
        <div class="group form-buttons">
          <button class="delete" @click="deleteFolderEdit"> {{deleteText}} </button>
          <button class="cancel" @click="closeFolderEdit"> Cancel </button>
          <button class="save" @click="saveFolderEdit" :disabled="!editFolderEnabled"> Save </button>
        </div>
      </div>
    </modal>

    <div v-if="userType === 'instructor' && !showDeleted" class="add-folder">
      <h3>New Folder</h3>
      <label for="new-folder-name">Name:</label>
      <input v-model='newFolder.name' type='text' id="new-folder-name">
      <button @click="addFolder" :disabled="!newFolderEnabled">
        Add
      </button>
    </div>

    <div v-if="files.length" class="files">
      <div class="header"> Files </div>
      <div class="listing">
        <vue-good-table :columns="fileColumns" :rows="files">
          <template slot="table-row" slot-scope="props">
            <span
                v-if="props.column.field === 'filename'"
                class="clickable filename">
              <font-awesome-icon :icon="fileIcon"></font-awesome-icon>
              <span>&nbsp</span>
              <a :href="props.row.Source.filepath">{{props.row.filename}}</a>
            </span>
            <span v-else-if="props.column.field === 'annotations'" style="display:flex; justify-content:space-around;">
              <div class="annotations"> Mine:  {{annotations.filter(a => a.filepath === props.row.Source.filepath)[0]["me"]}} </div>
              <div class="annotations"> Unread:  {{annotations.filter(a => a.filepath === props.row.Source.filepath)[0]["unread"]}} </div>
              <div class="annotations"> Reply Requests:  {{annotations.filter(a => a.filepath === props.row.Source.filepath)[0]["replyRequests"]}} </div>
              <div class="annotations"> Total:  {{annotations.filter(a => a.filepath === props.row.Source.filepath)[0]["total"]}} </div>
            </span>
            <span v-else-if="props.column.field === 'Source.Assignment.deadlineString'">
              <span>
                {{ props.row.Source.Assignment ?
                  props.formattedRow[props.column.field] : "N/A" }}
              </span>
           
            </span>
            <span v-else-if="props.column.label === 'Edit' && (userType === 'instructor' && !showDeleted)">
              <font-awesome-icon
                  v-if="userType === 'instructor'"
                  class="clickable"
                  :icon="editIcon"
                  @click="editAssignment(props.row)">
              </font-awesome-icon>
            </span>
            <span v-else-if="props.column.label === 'Restore' && (userType === 'instructor' && showDeleted)">
              <font-awesome-icon
                  v-if="userType === 'instructor'"
                  class="clickable"
                  :icon="restoreIcon"
                  @click="restoreFile(props.row)">
              </font-awesome-icon>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <modal name="edit-file-modal" height="auto">
      <!-- TODO: add options to edit filename, URL, etc -->
      <div v-if="edittingFile.file" class="edit-file-form">
        <h3>{{ edittingFile.file.filename }}</h3>
        <div class="group">
        <label for="edit-filename"> Name: </label>
        <input id="edit-filename" type="text" v-model="edittingFile.newFilename">
        </div>
        <div class="group">
        <label for="edit-filepath"> URL: </label>
        <input id="edit-filepath" type="text" v-model="edittingFile.newFilepath">
        </div>
        <div class="group">
          <div class="label"> Assignment Due: </div>
          <div class="field">
            <Datetime
                v-model="edittingFile.newDeadline"
                type="datetime"
                :inline="true"
                minute-step="1"
                use12-hour="true"
                :bootstrap-styling="true">
            </Datetime>
          </div>
        </div>
        <div class="group form-buttons">
        <button class="delete" @click="deleteEdit"> {{deleteText}} </button>
          <button class="cancel" @click="closeEdit"> Cancel </button>
          <button class="save" @click="saveEdit" :disabled="!editEnabled"> Save </button>
        </div>
      </div>
    </modal>

    <div v-if="userType === 'instructor' && !showDeleted" class="add-file">
      <h3>New Web File</h3>
      <label for="new-file-name">Name:</label>
      <input v-model='newFile.name' type='text' id="new-file-name">
      <label for="new-file-url">URL:</label>
      <input v-model='newFile.url' type='text' id="new-file-url">
      <button @click="addFile" :disabled="!newFileEnabled">Add</button>
    </div>
    <br>
    <div v-if="userType === 'instructor' && !showDeleted" class="add-file">
        <h3>New Pdf File</h3>
        <label for="new-pdf-file-name">Name:</label>
        <input v-model='newPdfFile.name' type='text' id="new-pdf-file-name">
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        <button @click="submitFile" :disabled="!newPdfFileEnabled">Add</button>

    </div>
    <notifications position="bottom right" group="addFile" />
  </div>
  
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faFolder, faFile, faEdit, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons'
  import Vue from 'vue'
  import VModal from 'vue-js-modal'
  import moment from 'moment'
  import Notifications from 'vue-notification'
  import loading from 'vuejs-loading-screen'
  Vue.use(VModal)
  Vue.use(Notifications)
  Vue.use(loading, {
    bg: '#4a2270ad',
    icon: 'refresh',
    size: 3,
    icon_color: 'white',
})
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import axios from 'axios'
  export default {
    name: "course-contents",
    props:{
      userType: {
        type: String,
        default: ""
      },
      path: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        folderIcon: faFolder,
        trashIcon: faTrash,
        fileIcon: faFile,
        editIcon: faEdit,
        restoreIcon: faTrashRestore,
        fileColumns: [
        {
            label: 'Edit',
            field: '()=>{}',
          },
          {
            label: 'Name',
            field: 'filename',
            sortable: true,
            // filterOptions: {
            //   enabled: true,
            // },
          },
          {
            label: 'Annotations', 
            field: 'annotations', 
            sortable: true
          },
          {
            label: 'Assignment Due',
            field: 'Source.Assignment.deadlineString',
            type: 'date',
            dateInputFormat: "MM/dd/yyyy HH:mm",
            dateOutputFormat: 'iii MMM do hh:mm a',
            sortable: true,
          },
          {
            label: 'Last Updated',
            field: 'updatedAtString',
            type: 'date',
            dateInputFormat: "MM/dd/yyyy HH:mm",
            dateOutputFormat: 'MMM do yy',
            sortable: true,
          }    
          
        ],
        contents: [],
        newFolder: {
          name: "",
        },
        newFile: {
          name: "",
          url: "",
        },
        newPdfFile: {
          name: ""
        },
        pdfFileUpload: null,
        edittingFile: {
          file: null,
          newFilename: "",
          newFilepath: ""
        },
        edittingFolder: {
          folder: null,
          newFoldername: ""
        },
        deleteText: "Delete",
        showDeleted: false,
        annotations: []
      }
    },
    computed:{
      newFolderEnabled: function() {
        return this.newFolder.name.length > 0
      },
      newFileEnabled: function() {
        return this.newFile.name.length > 0 && this.newFile.url.length > 0
      },
      newPdfFileEnabled: function() {
        return this.pdfFileUpload && this.newPdfFile.name.length > 0
      },
      editEnabled: function() {
        let ans = this.edittingFile.newFilename.length > 0 && this.edittingFile.newFilepath.length > 0
        try {
          let url = new URL(this.edittingFile.newFilepath)
         
        }
        catch (_) {
          ans = false
        }
        return ans
      },
      editFolderEnabled: function() {
        let ans = this.edittingFolder.newFoldername.length > 0
        return ans
      },
      directories: function() {
        return this.contents.filter(item => item.is_directory).filter((directory)=>{return this.showDeleted ? directory.deleted : !directory.deleted})
      },
      files: function() {
        return this.contents.filter(item => !item.is_directory).filter((file)=>{return this.showDeleted ? file.deleted : !file.deleted})
      },
      currentDir: function() {
        return this.path[this.path.length - 1]
      },
      trashExists: function() {
        return this.contents.filter((a)=>{return a.deleted}).length > 0
      }
    },
    watch:{
      currentDir: function() {
        this.loadFiles()
      },
      showDeleted: function() {
        if(this.showDeleted) this.fileColumns[0].label = "Restore"
        else this.fileColumns[0].label = "Edit"
      }, 
    },
    methods:{
      addFolder: function() {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/folder/${this.currentDir.id}`, this.newFolder, headers)
          .then(() =>{
            this.newFolder = { name: "" }
            this.loadFiles()
          })
      },
      addFile: function() {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/${this.currentDir.id}`, this.newFile, headers)
          .then((result) =>{
            this.newFile = { name: "", url: "" }
            //console.log(result)
            if(!result.data.error) {
              this.loadFiles();
              Vue.notify({
              group: 'addFile',
              title: 'Your file was added',
              type: 'success',
              })
            }
            else {
              console.log("NO FILE")
              Vue.notify({
              group: 'addFile',
              title: 'Your file was not added',
              type: 'error',
              text: 'You have added this file in the past. Try looking through your files (or deleted files) for it!'
              })
            }
          })
      },
      loadFiles: function() {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.get(`/api/files/folder/${this.currentDir.id}`, headers)
          .then(res => {
          
            for (let file of res.data) {
              file.updatedAtString = moment(String(file.updatedAt)).format('MM/DD/YYYY HH:mm');
              if (file.Source && file.Source.Assignment) {
                file.Source.Assignment.deadlineString = moment(String(file.Source.Assignment.deadline)).format('MM/DD/YYYY HH:mm')
              }

              if (file.Source && file.Source.Class){
                this.numberAnnotations(file.Source.filepath, file.Source.Class.id)
              }
              
            }
        
            
            this.contents = res.data
          })
        
      },
      numberAnnotations: function(filepath, class_id){
        const token = localStorage.getItem("nb.user");
        const config = {headers: { Authorization: 'Bearer ' + token }}
        axios.get(`/api/annotations/stats?url=${escape(filepath)}&class=${class_id}`, config)
          .then((res) => {
            res.data.filepath = filepath
            this.annotations.push(res.data)
          })
      },
      getRequestReply: function(locations){
        let numReqs = 0
        for (let i = 0; i < locations.length; i++){
          if(locations[i].Thread){
            for(let j = 0; j < locations[i].Thread.AllAnnotations.length; j++){
              numReqs += locations[i].Thread.AllAnnotations[j].ReplyRequesters.length
            }
          }
        }
        return numReqs
      },
      switchDirectory: function(directory) {
        this.showDeleted = false
        this.$emit('switch-directory', directory)
      },
      editFolder: function(directory) {
        this.edittingFolder.folder = directory
        this.edittingFolder.newFoldername = directory.filename
        this.$modal.show('edit-folder-modal')
      },
      editAssignment: function(file) {
        this.edittingFile.file = file
        this.deleteText = "Delete"
        if (file.Source.Assignment) {
          this.edittingFile.newDeadline = file.Source.Assignment.deadline
        }
        this.edittingFile.newFilename = file.filename
        this.edittingFile.newFilepath = file.Source.filepath
        this.$modal.show('edit-file-modal')
      },
      restoreFile: function(file) {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/restore/${file.id}`, {}, headers)
          .then(() =>{
            this.loadFiles()
            
          })
      },
      restoreFolder: function(dir) {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/restore/${dir.id}`, {}, headers)
          .then(() =>{
            this.loadFiles()
            
          })
      },
      saveEdit: function() {
        const body = { deadline: this.edittingFile.newDeadline, filename: this.edittingFile.newFilename, filepath: this.edittingFile.newFilepath }
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/update/${this.edittingFile.file.id}`, body, headers)
          .then(() =>{
            this.closeEdit()
            this.loadFiles()
            
          })
      },
      saveFolderEdit: function() {
        const body = {filename: this.edittingFolder.newFoldername}
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/update/${this.edittingFolder.folder.id}`, body, headers)
          .then(() =>{
            this.closeFolderEdit()
            this.loadFiles()
            
          })
      },
      closeEdit: function() {
        this.$modal.hide('edit-file-modal')
        this.edittingFile = {
          file: null,
          newFilename: "",
          newFilepath: ""
        }
      },
      closeFolderEdit: function() {
        this.$modal.hide('edit-folder-modal')
        this.edittingFolder = {
          folder: null,
          newFoldername: "",
        }
      },
      deleteEdit: function() {
        /*
        Confirm whether they want to delete
        if(this.deleteText == "Delete") {
          this.deleteText = "Confirm Delete"
          return
        }
        */
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/delete/${this.edittingFile.file.id}`, {}, headers)
          .then(() =>{
            this.closeEdit()
            this.loadFiles()
            this.deleteText = "Delete"
          })
      },
      deleteFolderEdit: function() {
        /*
        Confirm whether they want to delete
        if(this.deleteText == "Delete") {
          this.deleteText = "Confirm Delete"
          return
        }
        */
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post(`/api/files/file/delete/${this.edittingFolder.folder.id}`, {}, headers)
          .then(() =>{
            this.closeFolderEdit()
            this.loadFiles()
          })
      },
      handleFileUpload(){
        this.pdfFileUpload = this.$refs.file.files[0];
      },
      submitFile() {
        this.$isLoading(true) // open loading screen      
        let formData = new FormData();
        formData.append('file', this.pdfFileUpload);
        formData.append('name', this.newPdfFile.name)
        const token = localStorage.getItem("nb.user");
        const headers = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + token 
          }
        }
        axios.post(`/api/files/filePdf/${this.currentDir.id}`, formData, headers)
          .then((result) =>{
            this.$isLoading(false) // close loading screen      
            this.newPdfFile = { name: ""}
            if(!result.data.error) {
              this.loadFiles();
              Vue.notify({
              group: 'addFile',
              title: 'Your file was added',
              type: 'success',
              })
            }
            else {
              console.log("NO FILE")
              Vue.notify({
              group: 'addFile',
              title: 'Your file was not added',
              type: 'error',
              text: 'You have added this file in the past. Try looking through your files (or deleted files) for it!'
              })
            }
          })
        
      },
    },
    mounted: function() {
      this.loadFiles()
      window.setInterval(()=> {
        let new_annotations = []
        for (let file of this.contents){
          if (file.Source && file.Source.Class){
            const token = localStorage.getItem("nb.user");
            const config = {headers: { Authorization: 'Bearer ' + token }}
            axios.get(`/api/annotations/stats?url=${escape(file.Source.filepath)}&class=${file.Source.Class.id}`, config)
            .then((res) => {
              res.data.filepath = file.Source.filepath
              new_annotations.push(res.data)
            })
          }
        }
        this.annotations = new_annotations
      }, 60000)
    },
    components: {
      FontAwesomeIcon,
      VueGoodTable,
      Datetime,
    }
  }
</script>

<style scoped>
  .course-contents {
    padding-top: 10px;
  }
  .breadcrumb {
    display: flex;
    font-size: 16px;
  }
  .breadcrumb h3 {
    margin: 0;
    font-size: 18px;
    font-weight: normal;
    color: #444;
    cursor: pointer;
  }
  .breadcrumb h3:hover {
    color: #000;
    font-weight: bold;
  }
  .breadcrumb h3:not(:first-child):before {
    content: ">";
    margin-left: 7px;
  }
  .breadcrumb h3:last-child {
    color: #000;
    font-weight: bold;
  }
  p.empty {
    text-align: left;
    color: #444;
  }
  .directories {
    padding: 10px 0;
  }
  .directories .header {
    padding-bottom: 5px;
    color: #444;
    font-size: 14px;
    text-align: left;
  }
  .directories .listing {
    display: flex;
    flex-flow: row wrap;
  }
  .directories .listing .item {
    width: 180px;
    padding: 10px 20px;
    margin-right: 10px;
    border: solid 1px #aaa;
    border-radius: 5px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .directories .listing .item span {
    margin-left: 10px;
  }
  .directories .listing .item .editdir .clickable {
    cursor: pointer;
  }
  .directories .listing .item .editdir .clickable:hover {
    color: #007bff;
  }
  .directories .listing .item .jj {
    cursor: pointer;
  }
  .directories .listing .item .jj:hover {
    color: #007bff;
  }
  .directories .listing .item .trash_item {
    cursor: pointer;
  }
  .directories .listing .item .trash_item:hover {
    color: #007bff;
  }
  .add-folder {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  .add-folder h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0 5px 0 0;
  }
  .add-folder input {
    max-width: 300px;
    margin: 0 5px;
    padding: 6px 8px;
    border: solid 1px #aaa;
    border-radius: 5px;
    font-size: 16px;
    flex-grow: 1;
  }
  .add-folder button {
    padding: 6px 8px;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .add-folder button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .add-folder button:enabled:hover {
    background-color: #0069d9;
  }
  .files {
    padding: 10px 0;
  }
  .files .header {
    padding-bottom: 5px;
    color: #444;
    font-size: 14px;
    text-align: left;
  }
  .files .listing .clickable {
    cursor: pointer;
  }
  .files .listing .clickable:hover {
    color: #007bff;
  }
  .files .listing .filename span {
    margin-left: 5px;
  }
  .edit-file-form {
    height: 100%;
    overflow: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .edit-file-form .group {
    padding: 8px;
    display: flex;
  }
  .edit-file-form .group .field {
    margin-left: 10px;
    flex-grow: 1;
  }
  .edit-file-form .form-buttons {
    padding: 8px 8px 16px 8px;
  }
  .edit-file-form .form-buttons button {
    width: 80px;
    padding: 6px;
    margin: 0 10px;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .edit-file-form .form-buttons button.delete {
    background-color: #ba000d;
    border: solid 1px ;
  }
  .edit-file-form .form-buttons button.delete:hover {
    background-color: #ff7961;
  }
  .edit-file-form .form-buttons button.cancel {
    background-color: #6c757d;
    border: solid 1px #6c757d;
    
  }
  .edit-file-form .form-buttons button.cancel:hover {
    background-color: #5a6268;
  }
  .edit-file-form .form-buttons button.save {
    background-color: #007bff;
    border: solid 1px #007bff;
  }
  .edit-file-form .form-buttons button.save:hover {
    background-color: #0069d9;
  }
  .edit-file-form .form-buttons button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .edit-file-form .group label {
    margin-right: 5px;
  }
  .edit-file-form .group input {
    padding: 4px 6px;
    border-radius: 3px;
    border: solid 1px #aaa;
    font-size: 16px;
    flex-grow: 1;
  }
  .edit-file-form .message {
    color: #cf000f;
    font-size: 14px;
  }
  .add-file {
    display: flex;
    align-items: center;
  }
  .add-file h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0 5px 0 0;
  }
  .add-file input {
    max-width: 300px;
    margin: 0 5px;
    padding: 6px 8px;
    border: solid 1px #aaa;
    border-radius: 5px;
    font-size: 16px;
    flex-grow: 1;
  }
  .add-file button {
    padding: 6px 8px;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .add-file button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .add-file button:enabled:hover {
    background-color: #0069d9;
  }
  
  .annotations {
    color: black;
    background-color:  #8c58af46;
    border-radius: 5px; 
    padding: 3px;
  }
</style>