! function(t) { t.fn.extend({ aCollapTable: function(a) { var e = { startCollapsed: !1, addColumn: !0, plusButton: "+", minusButton: "-" },
                a = t.extend(e, a),
                n = this,
                s = [],
                d = function(e, n, s, c) { s = "undefined" == typeof s ? n.parents("tr").data("id") : s, c = "undefined" == typeof c ? n.hasClass("act-expanded") ? "none" : "table-row" : c, t("tr[data-parent=" + s + "]", e).each(function(a, s) { t(s).css("display", c), t(s).hasClass("act-tr-expanded") && d(e, n, t(s).data("id"), c) }), spacer = r(n.parents("tr")), "none" == c ? (n.html(spacer + a.plusButton).removeClass("act-expanded").addClass("act-collapsed"), n.parents("tr").addClass("act-tr-collapsed").removeClass("act-tr-expanded")) : (n.html(spacer + a.minusButton).removeClass("act-collapsed").addClass("act-expanded"), n.parents("tr").addClass("act-tr-expanded").removeClass("act-tr-collapsed")) },
                c = function(a) { t("tr", a).each(function(a, e) { t(e).data("id") && ($parentElement = { id: t(e).data("id"), parent: t(e).data("parent") }, s.push($parentElement)) }), s = [], t("tr", a).each(function(a, e) { t(e).data("id") && (level = l(t(e)), t(e).attr("data-level", level)) }) },
                l = function(a, e) { return e = "undefined" == typeof e ? 0 : e, "" == a.data("parent") ? e : ($parentElement = t("tr[data-id=" + a.data("parent") + "]"), l($parentElement, e + 1)) },
                r = function(t) { for (spacer = "", i = 0; i < t.data("level"); i++) spacer += "&nbsp;&nbsp;"; return spacer },
                o = function(a) { t(document).on("click", ".act-button-expand", function() { t("tr", n).length > 0 && (expands = [], t("tr", n).each(function(a, e) { t(e).hasClass("act-tr-collapsed") && "none" != t(e).css("display") && expands.push(t(e)) }), t.each(expands, function(e, n) { d(a, t(".act-more", n)) })) }), t(document).on("click", ".act-button-collapse", function() { t("tr", n).length > 0 }), t(document).on("click", ".act-button-expand-all", function() { t("tr", n).length > 0 && (collapseds = [], t("tr", n).each(function(a, e) { t(e).hasClass("act-tr-collapsed") && d(t(".act-more", t(e))) })) }), t(document).on("click", ".act-button-collapse-all", function() { t("tr", n).length > 0 && (collapseds = [], t("tr", n).each(function(a, e) { t(e).hasClass("act-tr-expanded") && d(t(".act-more", t(e))) })) }) }; return this.each(function() { var e = a,
                    n = t(this);
                c(n), o(n), t("tr", n).length > 0 && (t("tr", n).each(function(a, s) { spacer = r(t(s)), $minus = t("<a />").attr("href", "javascript:void(0)").addClass("act-more act-expanded").html(spacer + e.minusButton).bind("click", function() { d(n, t(this)) }), t("tr[data-parent=" + t(s).data("id") + "]", n).length > 0 ? ($button = 1 == e.addColumn ? t("<td />").html($minus) : $minus, itemClass = e.startCollapsed ? "act-tr-collapsed" : "act-tr-expanded", t(s).addClass(itemClass)) : $button = 1 == e.addColumn ? t("<td />").html(spacer + "&nbsp;&nbsp;") : spacer + "&nbsp;&nbsp;", 1 == e.addColumn ? t(s).prepend($button) : t(s).children(":first").prepend($button), t(s).addClass("act-tr-level-" + t(s).data("level")) }), e.startCollapsed && t(".act-more", n).each(function(a, e) { t(e).click() })) }) } }) }(jQuery);

$(document).ready(() => {
    initalizeInteractiveElements();
    addResizeListeners();
    addModalListeners();
    addTooltipsAndCollaptable();
    setMenuClickListener();
    setSidenavCloseListener();
});

var rootEl = $(document.documentElement);
var sidenavEl = $('.sidenav');
var gridEl = $('.grid');
var darkModeToggleEl = $('.navList-heading-darkModeToggle');
var SIDENAV_ACTIVE_CLASS = 'sidenav--active';
var GRID_NO_SCROLL_CLASS = 'grid--noscroll';
var SHOW_MODAL_CLASS = 'show-modal';
var modalEl = $('.modal');
var dashboardSettingsEl = $('.main-table-dashboardSetting');
var modalCloseEl = $('.modal-close-button');
var customTooltipEl = $('.mai-table-sharedWithBadge');
var tableEl = $('.main-table');

function initalizeInteractiveElements() {
    rootEl = document.documentElement;
    sidenavEl = $('.sidenav');
    gridEl = $('.grid');
    darkModeToggleEl = $('.navList-heading-darkModeToggle');
    SIDENAV_ACTIVE_CLASS = 'sidenav--active';
    GRID_NO_SCROLL_CLASS = 'grid--noscroll';
    modalEl = $('.modal');
    dashboardSettingsEl = $('.main-table-dashboardSetting');
    modalCloseEl = $('.modal-close-button');
    customTooltipEl = $('.mai-table-sharedWithBadge');
    tableEl = $('.main-table');
}

function addModalListeners() {
    dashboardSettingsEl.on('click', toggleModal);
    modalCloseEl.on('click', toggleModal);
    $(window).on('click', windowOnClick);
}

function addTooltipsAndCollaptable() {
    customTooltipEl.tooltip({
        position: {
            my: "center top+20",
            at: "center bottom",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });
    tableEl.aCollapTable({
        startCollapsed: true,
        addColumn: false,
        plusButton: '<i class="fas fa-plus-square main-table-expandCollapseIcon"></i>',
        minusButton: '<i class="fas fa-minus-square main-table-expandCollapseIcon"></i>'
    });
}

function toggleClass(el, className) {
    if (el.hasClass(className)) {
        el.removeClass(className);
    } else {
        el.addClass(className);
    }
}

function swictClass(el, switchClass, switchWith) {
    el.removeClass(switchClass);
    el.addClass(switchWith);
}

function toggleDarkMode(isDarkMode) {
    if (isDarkMode) {
        rootEl.style.setProperty('--grid-area-bg-color', 'black');
        rootEl.style.setProperty('--text-color-light', '#F9FAFC');
        rootEl.style.setProperty('--text-color-dark', '#F9FAFC');
        rootEl.style.setProperty('--modal-overlay-bg-color', '255, 255, 255');
    } else {
        rootEl.style.setProperty('--grid-area-bg-color', '#F9FAFC');
        rootEl.style.setProperty('--text-color-light', '#777777');
        rootEl.style.setProperty('--text-color-dark', '#333333');
        rootEl.style.setProperty('--modal-overlay-bg-color', '0, 0, 0');
    }
}

function addResizeListeners() {
    $(window).resize(function(e) {
        const width = window.innerWidth;
        console.log('width: ', width);

        if (width > 750) {
            sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
            gridEl.removeClass(GRID_NO_SCROLL_CLASS);
        }
    });
}

function setMenuClickListener() {
    $('.header-menu').on('click', function(e) {
        toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
        toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
    });

    darkModeToggleEl.on('click', function(e) {
        if (darkModeToggleEl.hasClass('fa-toggle-on')) {
            swictClass(darkModeToggleEl, 'fa-toggle-on', 'fa-toggle-off');
            toggleDarkMode(false);
        } else {
            swictClass(darkModeToggleEl, 'fa-toggle-off', 'fa-toggle-on');
            toggleDarkMode(true);
        }
    })
}

function setSidenavCloseListener() {
    $('.sidenav-close-button').on('click', function(e) {
        toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
        toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
    });
}

function toggleModal() {
    toggleClass(modalEl, SHOW_MODAL_CLASS);
}

function windowOnClick(event) {
    if (event.target === modalEl[0]) {
        toggleModal();
    }
}