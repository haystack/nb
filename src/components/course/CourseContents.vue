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
          <span>{{dir.filename}}</span>
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
                class="item"
                @click="openFile(props.row)">
              <font-awesome-icon :icon="fileIcon"></font-awesome-icon>
              <span> {{props.row.filename}} </span>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

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
  import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'

  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

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
            field: 'due_date',
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
        }
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
      }
    },
    mounted: function() {
      this.loadFiles()
    },
    components: {
      FontAwesomeIcon,
      VueGoodTable
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
  .files .listing .item {
    cursor: pointer;
  }
  .files .listing .item:hover {
    color: #007bff;
  }
  .files .listing .item span {
    margin-left: 5px;
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
