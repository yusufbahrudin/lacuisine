<script>
export default {
  name: 'FormComponent',
  props: ['dataInput', 'categories'],
  data() {
    return {
      formStatus: 'new'
    }
  },
  methods: {
    submitForm() {
      if (this.dataInput.id) {
        this.formStatus = 'edit'
      }
      this.$emit('handleFormData', this.dataInput, this.formStatus)
      this.dataInput = {}
    }
  }
}
</script>
<template>
  <div class="content-body">
    <div class="container d-flex justify-content-center my-5">
      <div class="card p-3 w-50">
        <h4 class="text-center mb3">{{ formStatus }} New Cuisine</h4>
        <form id="add-form" @submit.prevent="submitForm">
          <label for="form-name" class="form-label">Name</label>
          <input
            v-model="dataInput.name"
            id="form-name"
            type="text"
            placeholder="input name"
            class="form-control mb-3"
          />

          <label for="form-category" class="form-label">Categpry</label>
          <select
            v-model="dataInput.categoryId"
            class="form-control mb-3 select-option select-input"
          >
            <option value="" disabled selected>--Select Category--</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <label for="form-description" class="form-label">Description</label>
          <input
            v-model="dataInput.description"
            id="form-description"
            type="text"
            placeholder="input description"
            class="form-control mb-3"
          />
          <label for="form-price" class="form-label">Price</label>
          <input
            v-model="dataInput.price"
            id="form-price"
            type="text"
            placeholder="input price"
            class="form-control mb-3"
          />
          <label for="form-status" class="form-label">Status</label>
          <select v-model="dataInput.status" class="form-control mb-3">
            <option value="" disabled selected>--Select Status--</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Archived">Archived</option>
          </select>
          <label for="form-imgurl" class="form-label">ImageUrl</label>
          <input
            v-model="dataInput.imgUrl"
            id="form-imgUrl"
            type="text"
            placeholder="input imgUrl"
            class="form-control mb-3"
          />
          <button type="submit" class="btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
