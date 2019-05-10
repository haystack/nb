<template>
  <modal name="custom-form-modal">
    <div class="custom-form">
      <div class="custom-label">
        <input type="text" placeholder="Label (required)" v-model="label">
      </div>
      <div class="filter-header">
        Comments with:
      </div>
      <div class="filter-type" v-for="filter in filters">
        <input
            type="text"
            placeholder="0"
            v-model="filter.value"
            @keypress="e => validate(e, false)">
        or more {{ filter.label }}
      </div>
      <div class="form-buttons">
        <button class="cancel" @click="cancel"> Cancel </button>
        <button class="save" @click="save"> Save </button>
      </div>
    </div>
  </modal>
</template>

<script>
  import { isNumberKey } from "../../utils/input-util.js"
  import { CustomCriterion } from "../../models/grade-schema.js"

  export default {
    name: 'custom-form',
    props: {
      open: false,
      editting: null
    },
    data() {
      return {
        label: this.editting ? this.editting.label : null,
        filters: [
          { type: "HASHTAGS",
            label: "Hashtags",
            value: this.editting ? this.editting.filters.HASHTAGS : null },
          { type: "WORDS",
            label: "Words",
            value: this.editting ? this.editting.filters.WORDS : null },
          { type: "CHARS",
            label: "Characters",
            value: this.editting ? this.editting.filters.CHARS : null }
        ]
      }
    },
    watch: {
      open: function(val) {
        if (val) {
          this.$modal.show('custom-form-modal')
        } else {
          this.$modal.hide('custom-form-modal')
        }
      },
      editting: function(val) {
        if (val) {
          this.label = this.editting.label
          for (let filter of this.filters) {
            filter.value = this.editting.filters[filter.type]
          }
        } else {
          this.reset()
        }
      }
    },
    methods: {
      validate(event, allowDecimal) {
        return isNumberKey(event, allowDecimal)
      },
      cancel() {
        this.$emit('cancel-form')
      },
      save() {
        if (!this.label) {
          alert("Label cannot be empty!")
          return
        }
        if (this.editting) { // editting an existing criterion
          this.editting.label = this.label
          for (let filter of this.filters) {
            this.editting.setFilter(filter.value, filter.type)
          }
          this.$emit('save-criterion', this.editting)
        } else { // creating a new criterion
          let criterion = new CustomCriterion(Date.now(), this.label) // Actual ID is set by listener for new-criterion
          for (let filter of this.filters) {
            criterion.setFilter(filter.value, filter.type)
          }
          this.$emit('new-criterion', criterion)
        }
        this.reset()
      },
      reset() {
        this.label = null
        for (let filter of this.filters) {
          filter.value = null
        }
      }
    }
  }
</script>

<style scoped>
  .custom-form {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .custom-label,
  .filter-header,
  .filter-type,
  .form-buttons {
    width: 200px;
    padding: 8px;
  }
  .custom-label input {
    width: 192px;
    padding: 4px;
    font-size: 20px;
  }
  .filter-type input {
    width: 50px;
    font-size: 16px;
    text-align: center;
  }
  .form-buttons button {
    width: 80px;
    padding: 6px;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .form-buttons button.cancel {
    background-color: #6c757d;
    border: solid 1px #6c757d;
  }
  .form-buttons button.cancel:hover {
    background-color: #5a6268;
  }
  .form-buttons button.save {
    background-color: #007bff;
    border: solid 1px #007bff;
  }
  .form-buttons button.save:hover {
    background-color: #0069d9;
  }
</style>
