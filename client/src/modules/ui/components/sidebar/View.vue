<template>
    <div class='bd-sidebar-view' :class="{active: contentVisible, animating: animating}">
        <div class='bd-sidebar-region'>
            <div class='bd-settingsWrap'>
                <div class='bd-scroller'>
                    <slot name="sidebar" />
                </div>
            </div>
        </div>
        <div class='bd-content-region'>
            <slot name="content" />
            <div class='bd-content-tools' />
        </div>
    </div>
</template>
<script>
export default {
  props: {
    contentVisible: {
      default: false
    },
    animating: {
      default: false
    }
  }
}
</script>
<style>
    .bd-settingsWrap {
        padding: 20px 15px 15px 15px;
    }

    .bd-scroller {
        width: 100%;
        padding-right: 20px;
    }

    .bd-sidebar-view {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        box-sizing: border-box;
    }

        .bd-sidebar-view:not(.active) {
        }

        .bd-sidebar-view .bd-content-region {
            transform: translateX(-100%);
        }

            .bd-sidebar-view .bd-content-region .bd-content-tools {
                width: 100px;
                min-width: 100px;
            }

        .bd-sidebar-view.active .bd-content-region {
            animation: slidein .6s forwards;
        }

        .bd-sidebar-view .bd-content > div:not(.active) {
            opacity: 0;
        }

        .bd-sidebar-view .bd-content .animating {
            animation: fade-out .4s forwards;
        }

        .bd-sidebar-view .bd-content {
            animation: fade-in .4s forwards;
        }

    .bd-sidebar-region {
        background: #202225;
        -webkit-box-flex: 1;
        -webkit-box-pack: end;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding-top: 50px;
        z-index: 5;
    }

    .bd-content-region {
        background: #2F3136;
        -ms-flex: 1 1 800px;
        -ms-flex-align: start;
        -webkit-box-align: start;
        -webkit-box-flex: 1;
        align-items: flex-start;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex: 1 1 70%;
        position: relative;
        z-index: 1;
        padding-left: 15px;
    }

    .bd-sidebar-view .bd-settingsWrap {
        display: flex;
        height: 100%;
        -webkit-box-flex: 1;
        flex: 1;
        min-height: 1px;
        box-sizing: border-box;
    }

        .bd-sidebar-view .bd-settingsWrap .scroller {
            display: flex;
            height: 100%;
            -webkit-box-flex: 1;
            flex: 1;
            min-height: 1px;
            contain: layout;
            overflow-y: scroll;
        }

    @keyframes slidein {
        0% {
            transform: translateX(-100%);
            opacity: .2;
        }

        70% {
            transform: translateX(0%);
            opacity: 1;
        }

        100% {
            transform: translateX(0%);
            opacity: 1;
        }
    }

    @keyframes slideout {
        0% {
            transform: translateX(0%);
            opacity: 1;
        }

        100% {
            transform: translateX(-100%);
            opacity: .2;
        }
    }

    @keyframes slideoutin {
        0% {
            transform: translateX(-10%);
            opacity: 1;
        }

        20% {
            transform: translateX(-100%);
            opacity: .2;
        }

        70% {
            transform: translateX(0%);
            opacity: 1;
        }

        100% {
            transform: translateX(-10%);
            opacity: 1;
        }
    }

    @keyframes fade-out {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>
