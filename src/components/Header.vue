<template>
    <header id="header" :class="{ 'scroll' : isScroll }">
        
        <nav>
            <ul>
                <li><a v-for="el in nav" v-link="el.href" v-text="el.title"></a></li>
            </ul>
        </nav>
    </header>
</template>