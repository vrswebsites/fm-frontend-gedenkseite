<template>
    <nav class="bg-gray-200 p-4">
        <div class="flex space-x-4">
            <RouterLink to="/">
                <img class="h-8 w-auto" src="https://www.trauer.de/data/64/themesite-logo.png" alt="Your Company">

            </RouterLink>
            <RouterLink class="btn btn-outline-primary my-2 my-sm-0 mr-2" to="/">Home</RouterLink>
            <RouterLink v-if="$route.path == '/login' ? false : true" class="btn btn-outline-primary my-2 my-sm-0 mr-2"
                to="/login">
                Login
            </RouterLink>
            <RouterLink v-if="$route.path == '/register' ? false : true" class="btn btn-outline-primary my-2 my-sm-0"
                to="/register">Register</RouterLink>
        </div>
    </nav>
</template>