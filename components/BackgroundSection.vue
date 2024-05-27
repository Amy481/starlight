<template>
  <section class="section-background">
    <NuxtImg
      preload
      src="/starlight-background.jpg"
      class="background-image"
      alt="Background"
      fit="inside"
      sizes="sm:160 md:384 lg:512 xl:640 xxl:768"
      format="webp"
      quality="80" />
    <div class="col-12 text-white pt-md-5 pt-3 ps-md-5 ps-4 opacity-75">
      <slot />
    </div>
  </section>
</template>
<style scoped>
  .section-background {
    position: relative;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%);
  }

  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
</style>
