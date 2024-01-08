<template>
    <span class="loader"></span>
</template>

<style lang="scss" scoped>
@import '@/assets/lib.scss';

$clr_loader_fg: $clr_fg;
$clr_loader_primary: $clr_primary;
.loader {
    animation: rotate 1s infinite;
    height: 50px;
    width: 50px;
}

.loader:before,
.loader:after {
  border-radius: 50%;
  content: "";
  display: block;
  height: 20px;
  width: 20px;
}
.loader:before {
  animation: ball1 1s infinite;
  background-color: $clr_loader_fg;
  box-shadow: 30px 0 0 $clr_loader_primary;
  margin-bottom: 10px;
}
.loader:after {
  animation: ball2 1s infinite;
  background-color: $clr_loader_primary;
  box-shadow: 30px 0 0 $clr_loader_fg;
}

@keyframes rotate {
  0% { transform: rotate(0deg) scale(0.8) }
  50% { transform: rotate(360deg) scale(1.2) }
  100% { transform: rotate(720deg) scale(0.8) }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 $clr_loader_primary;
  }
  50% {
    box-shadow: 0 0 0 $clr_loader_primary;
    margin-bottom: 0;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 $clr_loader_primary;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 $clr_loader_fg;
  }
  50% {
    box-shadow: 0 0 0 $clr_loader_fg;
    margin-top: -20px;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 $clr_loader_fg;
    margin-top: 0;
  }
}

    
</style>