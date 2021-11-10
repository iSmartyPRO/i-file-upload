<template>
  <div>
    <nav class="uk-navbar-container uk-margin" uk-navbar>
      <div class="uk-navbar-center">
        <router-link :to="{ name: 'Home' }" class="uk-navbar-item uk-logo"
          >iFileUpload</router-link
        >
        <ul class="uk-navbar-nav">
          <li>
            <router-link :to="{ name: 'Home' }"
              ><span
                class="uk-icon uk-margin-small-right"
                uk-icon="icon: home"
              ></span>
              Home</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'File' }"
              ><span
                class="uk-icon uk-margin-small-right"
                uk-icon="icon: file"
              ></span>
              File</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Files' }"
              ><span
                class="uk-icon uk-margin-small-right"
                uk-icon="icon: copy"
              ></span>
              Files</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Users' }"
              ><span
                class="uk-icon uk-margin-small-right"
                uk-icon="icon: users"
              ></span>
              Users</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
</style>
