<template>
    <div class="bd-setting-switch">
        <div class="bd-title">
            <h3>{{setting.title}}</h3>
            <label class="bd-switch-wrapper">
                <input type="checkbox" class="bd-switch-checkbox" />
                <div class="bd-switch" />
            </label>
        </div>
        <div class="bd-hint">{{setting.hint}}</div>
    </div>
</template>
<script>
    export default {
        props: {
            setting: {}
        }
    }
</script>
<style>
    .bd-setting-switch {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: stretch;
        align-items: stretch;
    }

        .bd-setting-switch .bd-title {
            display: flex;
            justify-content: flex-start;
            -webkit-box-align: stretch;
            align-items: stretch;
            -webkit-box-direction: normal;
            -webkit-box-orient: horizontal;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
        }

        .bd-setting-switch .bd-switch-wrapper {
            flex: 0 0 auto;
            user-select: none;
            position: relative;
            width: 44px;
            height: 24px;
            display: block;
        }

            .bd-setting-switch .bd-switch-wrapper input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                width: 100%;
                height: 100%;
                z-index: 1;
            }

            .bd-setting-switch .bd-switch-wrapper .bd-switch {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: #72767d;
                border-radius: 14px;
                transition: background .15s ease-in-out,box-shadow .15s ease-in-out,border .15s ease-in-out;
            }

        .bd-setting-switch .bd-title h3 {
            font-weight: 500;
            color: #f6f6f7;
            flex: 1;
            line-height: 24px;
            margin-bottom: 0;
            margin-top: 0;
        }

        .bd-setting-switch .bd-hint {
            flex: 1 1 auto;
            color: #72767d;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 15px;
            line-height: 30px;
            border-bottom: 0px solid hsla(218,5%,47%,.1);
        }

        .bd-setting-switch .bd-switch-wrapper .bd-switch:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: 3px;
            left: 3px;
            bottom: 3px;
            background: #f6f6f7;
            border-radius: 10px;
            transition: all .15s ease;
            box-shadow: 0 3px 1px 0 rgba(0,0,0,.05), 0 2px 2px 0 rgba(0,0,0,.1), 0 3px 3px 0 rgba(0,0,0,.05);
        }
</style>
