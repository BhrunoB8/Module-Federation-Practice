<template>
  <div>
    <h2 id="page-heading" data-cy="SportHeading">
      <span id="sport-heading">Sports</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh list</span>
        </button>
        <router-link :to="{ name: 'SportCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-sport"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Create a new Sport</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && sports && sports.length === 0">
      <span>No Sports found</span>
    </div>
    <div class="table-responsive" v-if="sports && sports.length > 0">
      <table class="table table-striped" aria-describedby="sports">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Title</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"><span>Author</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sport in sports" :key="sport.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'SportView', params: { sportId: sport.id } }">{{ sport.id }}</router-link>
            </td>
            <td>{{ sport.title }}</td>
            <td>{{ sport.description }}</td>
            <td>{{ sport.author }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'SportView', params: { sportId: sport.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'SportEdit', params: { sportId: sport.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  @click="prepareRemove(sport)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="sportModuleApp.sport.delete.question" data-cy="sportDeleteDialogHeading">Confirm delete operation</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-sport-heading">Are you sure you want to delete Sport {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" @click="closeDialog()">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-sport"
            data-cy="entityConfirmDeleteButton"
            @click="removeSport()"
          >
            Delete
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./sport.component.ts"></script>
