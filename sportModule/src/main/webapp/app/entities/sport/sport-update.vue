<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2 id="sportModuleApp.sport.home.createOrEditLabel" data-cy="SportCreateUpdateHeading">Create or edit a Sport</h2>
        <div>
          <div class="form-group" v-if="sport.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="sport.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="sport-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="sport-title"
              data-cy="title"
              :class="{ valid: !v$.title.$invalid, invalid: v$.title.$invalid }"
              v-model="v$.title.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="sport-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="sport-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="sport-author">Author</label>
            <input
              type="text"
              class="form-control"
              name="author"
              id="sport-author"
              data-cy="author"
              :class="{ valid: !v$.author.$invalid, invalid: v$.author.$invalid }"
              v-model="v$.author.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./sport-update.component.ts"></script>
