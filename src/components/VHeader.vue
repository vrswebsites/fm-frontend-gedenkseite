<template>
    <nav class="navbar border-bottom p-2 px-4 bg-light">
        <RouterLink class="navbar-brand" to="/">Home</RouterLink>
        <form class="form-inline">
            <RouterLink v-if="$route.path == '/login' ? false : true" class="btn btn-outline-primary my-2 my-sm-0 mr-2"
                to="/login">
                Login
            </RouterLink>
            <RouterLink v-if="$route.path == '/register' ? false : true" class="btn btn-outline-primary my-2 my-sm-0"
                to="/register">Register</RouterLink>
        </form>
    </nav>
</template>
