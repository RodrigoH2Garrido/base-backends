<template>
  <v-responsive>
    <v-app class="d-flex flex-column">
      <v-app-bar title="My app" style="">
        <template v-slot:default>
           <v-list class="d-flex justify-start" style="width: 70% ;">
              <v-list-item
                v-for="(page,index) in pages"
                :key="index"
              >
                <RouterLink
                  :to="page.path"
                >
                  {{ page.name }}
                </RouterLink>
              </v-list-item>
            </v-list>
        </template>
      </v-app-bar>
      <v-main style="border: 1px solid red;">
        <RouterView />
        <v-slot></v-slot>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>

const pages = [
  {
    path: '/',
    name: 'Welcome'
  },
  {
    path: '/about',
    name: 'About'
  }
]
</script>