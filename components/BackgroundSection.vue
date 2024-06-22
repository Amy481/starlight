<template>
  <section class="section-background position-relative">
    <NuxtImg
      src="/starlight-background.jpg"
      class="background-image position-absolute object-fit-cover w-100 h-100"
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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%);
  }

  .background-image {
    z-index: -1;
  }
</style>
