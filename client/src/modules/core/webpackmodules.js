/**
 * BetterDiscord Client WebpackModules Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
const { Filters } = require('./utils');

const KnownModules = {
    React: Filters.byProperties(['createElement', 'cloneElement']),
    ReactDOM: Filters.byProperties(['render', 'findDOMNode']),

    /* Guild Info, Stores, and Utilities */
    GuildStore: Filters.byProperties(['getGuild']),
    SortedGuildStore: Filters.byProperties(['getSortedGuilds']),
    SelectedGuildStore: Filters.byProperties(['getLastSelectedGuildId']),
    GuildSync: Filters.byProperties(["getSyncedGuilds"]),
    GuildInfo: Filters.byProperties(["getAcronym"]),
    GuildChannelsStore: Filters.byProperties(['getChannels', 'getDefaultChannel']),
    GuildMemberStore: Filters.byProperties(['getMember']),
    MemberCountStore: Filters.byProperties(["getMemberCounts"]),
    GuildEmojiStore: Filters.byProperties(['getEmojis']),
    GuildActions: Filters.byProperties(['markGuildAsRead']),
    GuildPermissions: Filters.byProperties(['getGuildPermissions']),

    /* Channel Store & Actions */
    ChannelStore: Filters.byProperties(['getChannels', 'getDMFromUserId']),
    SelectedChannelStore: Filters.byProperties(['getLastSelectedChannelId']),
    ChannelActions: Filters.byProperties(["selectChannel"]),

    /* Current User Info, State and Settings */
    CurrentUserInfo: Filters.byProperties(["getToken"]),
    CurrentUserState: Filters.byProperties(["guildPositions"]),
    AccountManager: Filters.byProperties(['register', 'login']),
    UserSettingsUpdater: Filters.byProperties(['updateRemoteSettings']),
    OnlineWatcher: Filters.byProperties(['isOnline']),
    CurrentUserIdle: Filters.byProperties(['getIdleTime']),
    RelationshipStore: Filters.byProperties(['isBlocked']),
    MentionStore: Filters.byProperties(["getMentions"]),

    /* User Stores and Utils */
    UserStore: Filters.byProperties(['getCurrentUser']),
    UserStatusStore: Filters.byProperties(['getStatuses']),
    UserTypingStore: Filters.byProperties(['isTyping']),
    UserActivityStore: Filters.byProperties(['getActivity']),
    UserNameResolver: Filters.byProperties(['getName']),


    /* Emoji Store and Utils */
    EmojiInfo: Filters.byProperties(['isEmojiDisabled']),
    EmojiUtils: Filters.byProperties(['diversitySurrogate']),
    EmojiStore: Filters.byProperties(['getByCategory', 'EMOJI_NAME_RE']),

    /* Invite Store and Utils */
    InviteStore: Filters.byProperties(["getInvites"]),
    InviteResolver: Filters.byProperties(['findInvite']),
    InviteActions: Filters.byProperties(['acceptInvite']),


    /* Discord Objects & Utils */
    DiscordConstants: Filters.byProperties(["Permissions", "ActivityTypes", "StatusTypes"]),
    Permissions: Filters.byProperties(['getHighestRole']),
    ColorConverter: Filters.byProperties(['hex2int']),
    ColorShader: Filters.byProperties(['darken']),
    ClassResolver: Filters.byProperties(["getClass"]),
    ButtonData: Filters.byProperties(["ButtonSizes"]),
    IconNames: Filters.byProperties(["IconNames"]),

    /* Discord Messages */
    HistoryUtils: Filters.byProperties(['transitionTo', 'replaceWith', 'getHistory']),
    MessageActions: Filters.byProperties(['jumpToMessage', '_sendMessage']),
    MessageQueue: Filters.byProperties(['enqueue']),
    MessageParser: Filters.byProperties(['createMessage', 'parse', 'unparse']),

    /* In-Game Overlay */
    OverlayUserPopoutSettings: Filters.byProperties(['openUserPopout']),
    OverlayUserPopoutInfo: Filters.byProperties(['getOpenedUserPopout']),

    /* Experiments */
    ExperimentStore: Filters.byProperties(['getExperimentOverrides']),
    ExperimentsManager: Filters.byProperties(['isDeveloper']),
    CurrentExperiment: Filters.byProperties(['getExperimentId']),


    /* Images, Avatars and Utils */
    ImageResolver: Filters.byProperties(["getUserAvatarURL"]),
    ImageUtils: Filters.byProperties(['getSizedImageSrc']),
    AvatarDefaults: Filters.byProperties(["getUserAvatarURL", "DEFAULT_AVATARS"]),

    /* Drag & Drop */
    DNDActions: Filters.byProperties(["beginDrag"]),
    DNDSources: Filters.byProperties(["addTarget"]),
    DNDObjects: Filters.byProperties(["DragSource"]),

    /* Electron & Other Internals with Utils*/
    ElectronModule: Filters.byProperties(["_getMainWindow"]),
    Dispatcher: Filters.byProperties(['dirtyDispatch']),
    PathUtils: Filters.byProperties(["hasBasename"]),
    NotificationModule: Filters.byProperties(["showNotification"]),
    RouterModule: Filters.byProperties(["Router"]),
    APIModule: Filters.byProperties(["getAPIBaseURL"]),
    AnalyticEvents: Filters.byProperties(["AnalyticEventConfigs"]),
    KeyGenerator: Filters.byCode(/"binary"/),
    Buffers: Filters.byProperties(['Buffer', 'kMaxLength']),
    DeviceStore: Filters.byProperties(['getDevices']),
    SoftwareInfo: Filters.byProperties(["os"]),
    CurrentContext: Filters.byProperties(["setTagsContext"]),

    /* Media Stuff (Audio/Video) */
    MediaDeviceInfo: Filters.byProperties(["Codecs", "SUPPORTED_BROWSERS"]),
    MediaInfo: Filters.byProperties(["getOutputVolume"]),
    MediaEngineInfo: Filters.byProperties(['MediaEngineFeatures']),
    VoiceInfo: Filters.byProperties(["EchoCancellation"]),
    VideoStream: Filters.byProperties(["getVideoStream"]),
    SoundModule: Filters.byProperties(["playSound"]),

    /* Window, DOM, HTML */
    WindowInfo: Filters.byProperties(['isFocused', 'windowSize']),
    TagInfo: Filters.byProperties(['VALID_TAG_NAMES']),
    DOMInfo: Filters.byProperties(['canUseDOM']),
    HTMLUtils: Filters.byProperties(['htmlFor', 'sanitizeUrl']),

    /* Locale/Location and Time */
    LocaleManager: Filters.byProperties(['setLocale']),
    Moment: Filters.byProperties(['parseZone']),
    LocationManager: Filters.byProperties(["createLocation"]),
    Timestamps: Filters.byProperties(["fromTimestamp"]),

    /* Strings and Utils */
    Strings: Filters.byProperties(["TEXT", "TEXTAREA_PLACEHOLDER"]),
    StringFormats: Filters.byProperties(['a', 'z']),
    StringUtils: Filters.byProperties(["toASCII"]),

    /* URLs and Utils */
    URLParser: Filters.byProperties(['Url', 'parse']),
    ExtraURLs: Filters.byProperties(['getArticleURL']),


    /* DOM/React Components */
    /* ==================== */
    UserSettingsWindow: Filters.byProperties(['open', 'updateAccount']),
    LayerManager: Filters.byProperties(['popLayer', 'pushLayer']),

    /* Modals */
    ModalStack: Filters.byProperties(['push', 'update', 'pop', 'popWithKey']),
    UserProfileModals: Filters.byProperties(['fetchMutualFriends', 'setSection']),
    ConfirmModal: Filters.byPrototypeFields(['handleCancel', 'handleSubmit', 'handleMinorConfirm']),

    /* Popouts */
    PopoutStack: Filters.byProperties(['open', 'close', 'closeAll']),
    PopoutOpener: Filters.byProperties(['openPopout']),
    EmojiPicker: Filters.byPrototypeFields(['onHoverEmoji', 'selectEmoji']),

    /* Context Menus */
    ContextMenuActions: Filters.byCode(/CONTEXT_MENU_CLOSE/, c => c.close),
    ContextMenuItemsGroup: Filters.byCode(/itemGroup/),
    ContextMenuItem: Filters.byCode(/\.label\b.*\.hint\b.*\.action\b/),

    /* In-Message Links */
    ExternalLink: Filters.byCode(/\.trusted\b/)
};

const Cache = {};


class WebpackModules {

    /* Synchronous */
    static getModuleByNameSync(name, fallback) {
        if (Cache.hasOwnProperty(name)) return Cache[name];
        if (KnownModules.hasOwnProperty(name)) fallback = KnownModules[name];
        if (!fallback) return null;
        return Cache[name] = this.getModuleSync(fallback, true);
    }

    static getModuleByDisplayNameSync(name) {
        return this.getModuleSync(Filters.byDisplayName(name), true);
    }

    static getModuleByRegexSync(regex, first = true) {
        return this.getModuleSync(Filters.byCode(regex), first);
    }

    static getModuleByPrototypesSync(prototypes, first = true) {
        return this.getModuleSync(Filters.byPrototypeFields(prototypes), first);
    }

    static getModuleByPropsSync(props, first = true) {
        return this.getModuleSync(Filters.byProperties(props), first);
    }

    static getModuleSync(filter, first = true) {
        const modules = this.getAllModulesSync();
        const rm = [];
        for (let index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const { exports } = module;
            let foundModule = null;

            if (!exports) continue;
            if (exports.__esModule && exports.default && filter(exports.default)) foundModule = exports.default;
            if (filter(exports)) foundModule = exports;
            if (!foundModule) continue;
            if (first) return foundModule;
            rm.push(foundModule);
        }
        return rm;
    }

    static getAllModulesSync() {
        const id = 'bd-webpackmodulessync';
        const __webpack_require__ = window['webpackJsonp'](
            [],
            {
                [id]: (module, exports, __webpack_require__) => exports.default = __webpack_require__
            },
            [id]).default;
        delete __webpack_require__.m[id];
        delete __webpack_require__.c[id];
        return __webpack_require__.c;
    }

    /* Asynchronous */
    static async getModuleByName(name, first = true, fallback) {
        if (Cache.hasOwnProperty(name)) return Cache[name];
        if (KnownModules.hasOwnProperty(name)) fallback = KnownModules[name];
        if (!fallback) return null;
        return Cache[name] = await this.getModule(fallback, first);
    }

    static async getModuleByDisplayNameSync(name) {
        return await this.getModule(Filters.byDisplayName(name), true);
    }

    static async getModuleByRegexSync(regex, first = true) {
        return await this.getModule(Filters.byCode(regex), first);
    }

    static async getModuleByPrototypes(prototypes, first = true) {
        return await this.getModule(Filters.byPrototypeFields(prototypes), first);
    }

    static async getModuleByProps(props, first = true) {
        return await this.getModule(Filters.byProperties(props), first);
    }

    static async getModule(filter, first = true) {
        const modules = await this.getAllModules();
        const rm = [];
        for (let index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const { exports } = module;
            let foundModule = null;

            if (!exports) continue;
            if (exports.__esModule && exports.default && filter(exports.default)) foundModule = exports.default;
            if (filter(exports)) foundModule = exports;
            if (!foundModule) continue;
            if (first) return foundModule;
            rm.push(foundModule);
        }
        return rm;
    }

    static async getAllModules() {
        return new Promise(resolve => {
            const id = 'bd-webpackmodules';
            window['webpackJsonp'](
                [],
                {
                    [id]: (module, exports, __webpack_require__) => {
                        delete __webpack_require__.c[id];
                        delete __webpack_require__.m[id];
                        resolve(__webpack_require__.c);
                    }
                },
                [id]
            );
        });
    }

}

module.exports = { WebpackModules };