<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="sport">
        <h2 class="jh-entity-heading" data-cy="sportDetailsHeading"><span>Sport</span> {{ sport.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Title</span>
          </dt>
          <dd>
            <span>{{ sport.title }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ sport.description }}</span>
          </dd>
          <dt>
            <span>Author</span>
          </dt>
          <dd>
            <span>{{ sport.author }}</span>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span>Back</span>
        </button>
        <router-link v-if="sport.id" :to="{ name: 'SportEdit', params: { sportId: sport.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span>Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sport-details.component.ts"></script>
