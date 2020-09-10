<template>
<div class="wrapper">
    <div class="progressbar-wrapper">
        <div class="progressbar"> 
            <div class="side front"> 
            </div>
            <div class="side back"> 
            </div>
            <div class="side top"> 
            </div>
            <div class="side bottom"> 
            </div>
            <div class="side left"> </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Box',
}
</script>

<style scoped lang="scss">
@import '../css/app.sass';

.wrapper {
    @include center;
    width: 100%;
    min-height: 100%;
    position: absolute;
    display: block;
}
.progressbar-wrapper {
    @include center;
    width: 80%;
    height: 60%;
}
.progressbar {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(2deg) rotateY(2deg);
}
.side {
    width: 100%;
    height: 100%;
    background-color: rgba(225, 225, 225, 0.5);
    top: 0;
    left: 0;
    position: absolute;
    border: 1px solid rgba(200, 200, 200, 1);
    &:active {
      border: 1px solid rgba(0, 0, 200, 1);
    }
}
.bottom {
    box-shadow: 10px 10px 50px 5px rgba(150, 150, 150, 0.7);
    transform: rotateX(90deg);
    transform-origin: bottom;
}
.top {
    transform: translate(0, -100%) rotateX(90deg);
    transform-origin: bottom;
}
.back {
    transform: translateZ(0px);
}
.front {
    transform: translateZ(-550px);
}
.left {
    width: 100px;
    transform: rotateY(90deg);
    transform-origin: left;
}

</style>
