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

    <div v-if="directories.length" class="directories">
      <div class="header"> Folders </div>
      <div class="listing">
        <div
            v-for="dir in directories"
            class="item"
            :key="dir.id"
            @click="switchDirectory(dir)">
          <font-awesome-icon :icon="folderIcon"></font-awesome-icon>
          <span>{{ dir.filename }}</span>
        </div>
      </div>
    </div>

    <div v-if="userType === 'instructor'" class="add-folder">
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
                class="clickable filename"
                @click="openFile(props.row)">
              <font-awesome-icon :icon="fileIcon"></font-awesome-icon>
              <span>{{ props.row.filename }}</span>
            </span>
            <span v-else-if="props.column.field === 'assignment'">
              <span>
                {{ props.row.Source.Assignment ?
                  props.row.Source.Assignment.deadline : "N/A" }}
              </span>
              <font-awesome-icon
                  v-if="userType === 'instructor'"
                  class="clickable"
                  :icon="editIcon"
                  @click="editAssignment(props.row)">
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
          <div class="label"> Assignment Due: </div>
          <div class="field">
            <datepicker
                v-model="edittingFile.newDeadline"
                :inline="true"
                :bootstrap-styling="true">
            </datepicker>
          </div>
        </div>
        <div class="group form-buttons">
          <button class="cancel" @click="closeEdit"> Cancel </button>
          <button class="save" @click="saveEdit"> Save </button>
        </div>
      </div>
    </modal>

    <div v-if="userType === 'instructor'" class="add-file">
      <h3>New File</h3>
      <label for="new-file-name">Name:</label>
      <input v-model='newFile.name' type='text' id="new-file-name">
      <label for="new-file-url">URL:</label>
      <input v-model='newFile.url' type='text' id="new-file-url">
      <button @click="addFile" :disabled="!newFileEnabled">Add</button>
    </div>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faFolder, faFile, faEdit } from '@fortawesome/free-solid-svg-icons'

  import Vue from 'vue'
  import VModal from 'vue-js-modal'
  Vue.use(VModal)

  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import datepicker from 'vuejs-datepicker'

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
        fileIcon: faFile,
        editIcon: faEdit,
        fileColumns: [
          {
            label: 'Name',
            field: 'filename',
            sortable: true,
            // filterOptions: {
            //   enabled: true,
            // },
          },
          {
            label: 'Assignment Due', // TODO add due date field
            field: 'assignment',
            sortable: true,
          },
          {
            label: 'Last Updated', // TODO format
            field: 'updatedAt',
            sortable: true,
          },
        ],
        contents: [],
        newFolder: {
          name: "",
        },
        newFile: {
          name: "",
          url: "",
        },
        edittingFile: {
          file: null,
          newDeadline: "",
        },
      }
    },
    computed:{
      newFolderEnabled: function() {
        return this.newFolder.name.length > 0
      },
      newFileEnabled: function() {
        return this.newFile.name.length > 0 && this.newFile.url.length > 0
      },
      directories: function() {
        return this.contents.filter(item => item.is_directory)
      },
      files: function() {
        console.log(this.contents.filter(item => !item.is_directory))
        return this.contents.filter(item => !item.is_directory)
      },
      currentDir: function() {
        return this.path[this.path.length - 1]
      }
    },
    watch:{
      currentDir: function() {
        this.loadFiles()
      }
    },
    methods:{
      addFolder: function() {
        axios.post(`/api/files/folder/${this.currentDir.id}`, this.newFolder)
          .then(() =>{
            this.newFolder = { name: "" }
            this.loadFiles()
          })
      },
      addFile: function() {
        axios.post(`/api/files/file/${this.currentDir.id}`, this.newFile)
          .then(() =>{
            this.newFile = { name: "", url: "" }
            this.loadFiles()
          })
      },
      loadFiles: function() {
        axios.get(`/api/files/folder/${this.currentDir.id}`)
          .then(res => {
            this.contents = res.data
          })
      },
      switchDirectory: function(directory) {
        this.$emit('switch-directory', directory)
      },
      openFile: function(file) {
        location.href = file.Source.filepath
      },
      editAssignment: function(file) {
        this.edittingFile.file = file
        if (file.Source.Assignment) {
          this.edittingFile.newDeadline = file.Source.Assignment.deadline
        }
        this.$modal.show('edit-file-modal')
      },
      saveEdit: function() {
        let req = { deadline: this.edittingFile.newDeadline }
        axios.post(`/api/files/file/update/${this.edittingFile.file.id}`, req)
          .then(() =>{
            this.closeEdit()
            this.loadFiles()
          })
      },
      closeEdit: function() {
        this.$modal.hide('edit-file-modal')
        this.edittingFile = {
          file: null,
          newDeadline: "",
        }
      },
    },
    mounted: function() {
      this.loadFiles()
    },
    components: {
      FontAwesomeIcon,
      VueGoodTable,
      datepicker,
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
    cursor: pointer;
  }
  .directories .listing .item:hover {
    background-color: #eee;
  }
  .directories .listing .item span {
    margin-left: 10px;
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
</style>
