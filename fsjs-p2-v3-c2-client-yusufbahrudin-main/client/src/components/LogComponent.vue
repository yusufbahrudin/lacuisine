<script>
export default {
  props: ['histories']
}
</script>

<template>
  <div class="content-body">
    <div class="container-fluid mt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Data History Log</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Title</th>
                <th scope="col" width="180px">Description</th>
                <th scope="col">Updated By</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in histories" :key="history.id">
                <td>{{ history.id }}</td>
                <td>{{ history.title }}</td>
                <td>{{ history.description }}</td>
                <td>{{ history.updatedBy }}</td>
                <td>{{ history.createdAt }}</td>
                <td>{{ history.updatedAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
