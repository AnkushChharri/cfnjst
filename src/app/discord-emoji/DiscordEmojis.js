"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, X } from 'lucide-react';
import Link from 'next/link';


const dotSymbols = [
    {
        category: "Smileys & Emotion", symbols: [
            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙',
            '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😶‍🌫️', '😏', '😒', '🙄', '😬',
            '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '😵‍💫', '🤯', '🤠', '🥳',
            '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱',
            '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽',
            '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊'
        ]
    },

    {
        category: "People & Body", symbols: [
            , '👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎',
            '✊', '👊', '🤛', '🤜', '👏', '🙌', '🫶', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👣', '👂', '🦻',
            '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁', '👅', '👄', '🫦', '🧑', '👶', '🧒', '👦', '👧', '🧔', '👨', '🧔‍♂️', '👩', '🧔‍♀️',
            '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '🧑‍🦲', '👱', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲', '👱‍♂️', '👱‍♀️',
            '🧓', '👴', '👵', '🙍', '🙍‍♂️', '🙍‍♀️', '🙎', '🙎‍♂️', '🙎‍♀️', '🙅', '🙅‍♂️', '🙅‍♀️', '🙆', '🙆‍♂️', '🙆‍♀️', '💁', '💁‍♂️',
            '💁‍♀️', '🙋', '🙋‍♂️', '🙋‍♀️', '🧏', '🧏‍♂️', '🧏‍♀️', '🙇', '🙇‍♂️', '🙇‍♀️', '🤦', '🤦‍♂️', '🤦‍♀️', '🤷', '🤷‍♂️', '🤷‍♀️',
            '👨‍⚕️', '👩‍⚕️', '🧑‍⚕️', '👨‍🎓', '👩‍🎓', '🧑‍🎓', '👨‍🏫', '👩‍🏫', '🧑‍🏫', '👨‍⚖️', '👩‍⚖️', '🧑‍⚖️', '👨‍🌾', '👩‍🌾',
            '🧑‍🌾', '👨‍🍳', '👩‍🍳', '🧑‍🍳', '👨‍🔧', '👩‍🔧', '🧑‍🔧', '👨‍🏭', '👩‍🏭', '🧑‍🏭', '👨‍💼', '👩‍💼', '🧑‍💼', '👨‍🔬',
            '👩‍🔬', '🧑‍🔬', '👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎤', '👩‍🎤', '🧑‍🎤', '👨‍🎨', '👩‍🎨', '🧑‍🎨', '👨‍✈️', '👩‍✈️', '🧑‍✈️',
            '👨‍🚀', '👩‍🚀', '🧑‍🚀', '👨‍🚒', '👩‍🚒', '🧑‍🚒', '👮', '👮‍♂️', '👮‍♀️', '🕵️', '🕵️‍♂️', '🕵️‍♀️', '💂', '💂‍♂️', '💂‍♀️',
            '🥷', '👷', '👷‍♂️', '👷‍♀️', '🤴', '👸', '👳', '👳‍♂️', '👳‍♀️', '👲', '🧕', '🤵', '🤵‍♂️', '🤵‍♀️', '👰', '👰‍♂️', '👰‍♀️',
            '🤰', '🤱', '👩‍🍼', '👨‍🍼', '🧑‍🍼', '👼', '🎅', '🤶', '🧑‍🎄', '🦸', '🦸‍♂️', '🦸‍♀️', '🦹', '🦹‍♂️', '🦹‍♀️', '🧙',
            '🧙‍♂️', '🧙‍♀️', '🧚', '🧚‍♂️', '🧚‍♀️', '🧛', '🧛‍♂️', '🧛‍♀️', '🧜', '🧜‍♂️', '🧜‍♀️', '🧝', '🧝‍♂️', '🧝‍♀️', '🧞', '🧞‍♂️',
            '🧞‍♀️', '🧟', '🧟‍♂️', '🧟‍♀️', '🧌', '💆', '💆‍♂️', '💆‍♀️', '💇', '💇‍♂️', '💇‍♀️', '🚶', '🚶‍♂️', '🚶‍♀️', '🧍', '🧍‍♂️',
            '🧍‍♀️', '🧎', '🧎‍♂️', '🧎‍♀️', '🧑‍🦯', '👨‍🦯', '👩‍🦯', '🧑‍🦼', '👨‍🦼', '👩‍🦼', '🧑‍🦽', '👨‍🦽', '👩‍🦽', '🏃', '🏃‍♂️',
            '🏃',

            '‍♀️', '💃', '🕺', '🕴️', '👯', '👯‍♂️', '👯‍♀️', '🧖', '🧖‍♂️', '🧖‍♀️', '🧗', '🧗‍♂️', '🧗‍♀️', '🤺', '🏇', '⛷️', '🏂',
            '🏌️', '🏌️‍♂️', '🏌️‍♀️', '🏄', '🏄‍♂️', '🏄‍♀️', '🚣', '🚣‍♂️', '🚣‍♀️', '🏊', '🏊‍♂️', '🏊‍♀️', '⛹️', '⛹️‍♂️', '⛹️‍♀️',
            '🏋️', '🏋️‍♂️', '🏋️‍♀️', '🚴', '🚴‍♂️', '🚴‍♀️', '🚵', '🚵‍♂️', '🚵‍♀️', '🧘', '🧘‍♂️', '🧘‍♀️', '🛀', '🛌', '🤼', '🤼‍♂️',
            '🤼‍♀️', '🤸', '🤸‍♂️', '🤸‍♀️', '🤹', '🤹‍♂️', '🤹‍♀️', '🧑‍🤝‍🧑', '👭', '👫', '👬', '💏', '👩‍❤️‍💋‍👨', '👨‍❤️‍💋‍👨',
            '👩‍❤️‍💋‍👩', '💑', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '👪', '👨‍👩‍👦', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧',
            '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧',
            '👨‍👦', '👨‍👦‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👧‍👧', '👩‍👦', '👩‍👦‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👧‍👧', '🗣️', '👤', '👥', '🫂',
            '👣',
        ]
    },

    {
        category: "Animals & Nature", symbols: [
            , '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🦝', '🐻', '🐼', '🦘', '🦡', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉',
            '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐢', '🐍', '🦎', '🦖', '🦕',
            '🐙', '🪼', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘',
            '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺',
            '🐈', '🐈‍⬛', '🪶', '🐓', '🦃', '🦤', '🦢', '🦜', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🦫', '🦔', '🐾', '🐉',
            '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎋', '🎍', '🍃', '🍂', '🍁', '🍄', '🐚', '🪨', '🌾', '💐',
            '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙',
            '🌎', '🌍', '🌏', '🪐', '💫', '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️', '⛅', '🌥️', '🌦️', '🌧️', '⛈️',
            '🌩️', '🌨️', '❄️', '☃️', '⛄', '🌬️', '💨', '💧', '💦', '☔', '☂️', '🌊', '🌫️', '🕸️'

        ]
    },

    {
        category: "Food & Drink", symbols: [
            , '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🫐', '🥝', '🍅', '🫒', '🥥', '🥑', '🍆',
            '🥔', '🥕', '🌽', '🌶️', '🫑', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🫘', '🌰', '🍞', '🥐', '🥖', '🫓', '🥨', '🥯', '🥞',
            '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕',
            '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟',
            '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯',
            '🍼', '🥛', '☕', '🫖', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🫗', '🥤', '🧋'

            , '🧃', '🧉', '🧊', '🥢',
            , '🍽️', '🍴', '🥄', '🔪', '🫙', '🏺'
        ]
    },

    {
        category: "Travel & Places", symbols: [
            , '🌍', '🌎', '🌏', '🌐', '🗺️', '🗾', '🧭', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱',
            '🏘️', '🏚️', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪',
            '🕌', '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺', '🌁', '🌃', '🏙️', '🌄', '🌅', '🌆', '🌇', '🌉', '♨️', '🎠', '🎡', '🎢', '💈', '🎪',
            '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕',
            '🚖', '🚗', '🚘', '🚙', '🚚', '🚛', '🚜', '🏎️', '🏍️', '🛵', '🦽', '🦼', '🛺', '🚲', '🛴', '🛹', '🛼', '🚏', '🛣️', '🛤️',
            '🛢️', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '🛟', '⛵', '🛶', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '✈️', '🛩️', '🛫', '🛬', '🪂',
            '💺', '🚁', '🚟', '🚠', '🚡', '🛰️', '🚀', '🛸', '🛎️', '🧳', '⌛', '⏳', '⌚', '⏰', '⏱️', '⏲️', '🕰️', '🕛', '🕧', '🕐', '🕜',
            '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦'
        ]
    },

    {
        category: "Activities", symbols: [
            , '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎳', '🏏', '🏑', '🏒', '🥍', '🏓', '🏸', '🥊', '🥋', '🥅', '⛳', '⛸️',
            '🎣', '🤿', '🎽', '🎿', '🛷', '🥌', '🎯', '🪀', '🪁', '🎱', '🔮', '🪄', '🧿', '🎮', '🕹️', '🎰', '🎲', '🧩', '🧸', '🪅', '🪩',
            '🪆', '♠️', '♥️', '♦️', '♣️', '♟️', '🃏', '🀄', '🎴', '🎭', '🖼️', '🎨', '🧵', '🪡', '🧶', '🪢', '👓', '🕶️', '🥽', '🥼',
            '🦺', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '🥻', '🩱', '🩲', '🩳', '👙', '👚', '👛', '👜', '👝', '🛍️', '🎒',
            '👞', '👟', '🥾', '🥿', '👠', '👡', '🩰', '👢', '👑', '👒', '🎩', '🎓', '🧢', '🪖', '⛑️', '📿', '💄', '💍', '💎', '📱', '📲',
            '☎️', '📞', '📟', '📠', '🔋', '🪫', '🔌', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '🧮', '🎥', '🎬', '📽️',
            '📺', '📷', '📸', '📹', '📼', '🔍', '🔎', '🕯️', '💡', '🔦', '🏮', '🪔', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒',
            '📃', '📜', '📄', '📰', '🗞️', '📑', '🔖', '🏷️', '💰', '🪙', '💴', '💵', '💶', '💷', '💸', '💳', '🧾', '💹', '✉️', '📧', '📨',
            '📩', '📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '✏️', '✒️', '🖋️', '🖊️', '🖌️', '🖍️', '📝', '📁', '📂', '🗂️',
            '📅', '📆', '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️', '🗑️', '🔒',
            '🔓', '🔏', '🔐', '🔑', '🗝️', '🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔫', '🪃', '🏹', '🛡️', '🪚', '🔧', '🪛', '🔩',
            '⚙️', '🗜️', '⚖️', '🦯', '🔗', '⛓️', '🪝', '🧰', '🧲', '🪜', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊',
            '🩹', '🩺', '🚪', '🛗', '🪞', '🪟', '🛏️', '🛋️', '🪑', '🚽', '🪠', '🚿', '🛁', '🪤', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻',
            '🪣', '🧼', '🪥', '🧽',

            , '🧯', '🛒', '🚬', '⚰️', '🪦', '⚱️', '🧿', '🪬', '🕹️', '🧸', '🎎', '🎏', '🎐', '🧧', '🎀', '🎁'
            , '🎗️', '🎟️', '🎫', '🪅', '🪩', '🪭', '🃏', '🀄', '🎴', '🎭', '🖼️', '🎨', '🧵', '🪡', '🧶', '🪢'
        ]
    },

    {
        category: "Objects", symbols: [
            , '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '📟', '📠', '📺',
            '📻', '🎙️', '🎚️', '🎛️', '🧭', '🧿', '🪬', '📡', '🛰️', '☎️', '📞', '📟', '📠', '📽️', '🎞️', '📹', '📷', '📸', '📺', '📻',
            '🧭', '🎙️', '🎚️', '🎛️', '⏱️', '⏲️', '⏰', '🕰️', '💡', '🔦', '🕯️', '🪔', '🔌', '🔋', '💵', '💴', '💶', '💷', '💰', '💳',
            '💎', '⚖️', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🪓', '🔩', '⚙️', '🧱', '🧰', '🔪', '🔫', '🛡️', '🗡️', '⚔️', '🪚', '🪛', '🪝',
            '🧲', '🪜', '⚗️', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🚪', '🛗', '🪞', '🪟', '🛏️', '🛋️', '🪑', '🚽', '🚿',
            '🛁', '🧴', '🧷', '🧹', '🧺', '🧻', '🪣', '🧼', '🪥', '🧽', '🧯', '🛒', '🚬', '⚰️', '🪦', '⚱️', '🗿'
        ]
    },

    {
        category: "Symbols", symbols: [
            , '❤️', '💔', '❣️', '💖', '💝', '💘', '💗', '💓', '💞', '💕', '💟', '🫶', '🫰', '🫱', '🫲', '🫳', '🫴', '🫷', '🫸', '🫵', '🫱‍🫲',
            '🫂', '💏', '👩‍❤️‍💋‍👨', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩', '💑', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩', '🫄', '🫃', '🫅', '👑', '👒', '🎩',
            '🎓', '🧢', '🪖', '⛑️', '📿', '💄', '💍', '💎', '📱', '📲', '☎️', '📞', '📟', '📠', '🔋', '🪫', '🔌', '💻', '🖥️', '🖨️', '⌨️',
            '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '🔍', '🔎', '🕯️', '💡', '🔦', '🏮', '🪔', '📔', '📕', '📖', '📗', '📘', '📙', '📚',
            '📓', '📒', '📃', '📜', '📄', '📰', '🗞️', '📑', '🔖', '🏷️', '💰', '🪙', '💴', '💵', '💶', '💷', '💸', '💳', '🧾', '💹', '✉️',
            '📧', '📨', '📩', '📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '✏️', '✒️', '🖋️', '🖊️', '🖌️', '🖍️', '📝', '📁',
            '📂', '🗂️', '📅', '📆', '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️',
            '🗑️', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️', '🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔫', '🪃', '🏹', '🛡️', '🪚', '🔧',
            '🪛', '🔩', '⚙️', '🗜️', '⚖️', '🦯', '🔗', '⛓️', '🪝', '🧰', '🧲', '🪜', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉',
            '🩸', '💊', '🩹', '🩺', '🚪', '🛗', '🪞', '🪟', '🛏️', '🛋️', '🪑', '🚽', '🪠', '🚿', '🛁', '🪤', '🪒', '🧴', '🧷', '🧹',
            '🧺', '🧻', '🪣', '🧼', '🪥', '🧽', '🧯', '🛒', '🚬', '⚰️', '🪦', '⚱️', '🧿', '🪬', '🕹️', '🧸', '🎎', '🎏', '🎐', '🧧',
            '🎀', '🎁', '🎗️', '🎟️', '🎫', '🪅', '🪩', '🪭', '🃏', '🀄', '🎴', '🎭', '🖼️', '🎨', '🧵', '🪡', '🧶', '🪢'
        ]
    },

    {
        category: "Flags", symbols: [
            , '🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇫', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬',
            '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇨', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇲', '🇧🇹',
            '🇧'

            , '🇴', '🇧🇦', '🇧🇼', '🇧🇻', '🇧🇷', '🇮🇴', '🇻🇬', '🇧🇳', '🇧🇬', '🇧🇫', '🇧🇮', '🇨🇻', '🇰🇭', '🇨🇲', '🇨🇦', '🇮🇨', '🇨🇫',
            '🇹🇩', '🇨🇱', '🇨🇳', '🇨🇽', '🇨🇨', '🇨🇴', '🇰🇲', '🇨🇬', '🇨🇩', '🇨🇰', '🇨🇷', '🇨🇮', '🇭🇷', '🇨🇺', '🇨🇼', '🇨🇾', '🇨🇿',
            '🇩🇰', '🇩🇯', '🇩🇲', '🇩🇴', '🇪🇨', '🇪🇬', '🇸🇻', '🇬🇶', '🇪🇷', '🇪🇪', '🇪🇹', '🇪🇺', '🇫🇰', '🇫🇴', '🇫🇯', '🇫🇮', '🇫🇷',
            '🇬🇫', '🇵🇫', '🇹🇫', '🇬🇦', '🇬🇲', '🇬🇪', '🇩🇪', '🇬🇭', '🇬🇮', '🇬🇷', '🇬🇱', '🇬🇩', '🇬🇺', '🇬🇹', '🇬🇳', '🇬🇼', '🇬🇾',
            '🇭🇹', '🇭🇳', '🇭🇰', '🇭🇺', '🇮🇸', '🇮🇳', '🇮🇩', '🇮🇷', '🇮🇶', '🇮🇪', '🇮🇱', '🇮🇹', '🇯🇲', '🇯🇵', '🎌', '🇯🇪', '🇯🇴',
            '🇰🇿', '🇰🇪', '🇰🇮', '🇽🇰', '🇰🇼', '🇰🇬', '🇱🇦', '🇱🇻', '🇱🇧', '🇱🇸', '🇱🇷', '🇱🇾', '🇱🇹', '🇱🇺', '🇲🇴', '🇲🇬', '🇲🇼',
            '🇲🇾', '🇲🇻', '🇲🇱', '🇲🇹', '🇲🇭', '🇲🇶', '🇲🇷', '🇲🇺', '🇲🇽', '🇫🇲', '🇲🇩', '🇲🇨', '🇲🇳', '🇲🇪', '🇲🇸', '🇲🇦', '🇲🇿',
            '🇲🇲', '🇳🇦', '🇳🇷', '🇳🇵', '🇳🇱', '🇳🇨', '🇳🇿', '🇳🇮', '🇳🇪', '🇳🇬', '🇳🇺', '🇳🇫', '🇲🇵', '🇳🇴', '🇴🇲', '🇵🇰', '🇵🇼',
            '🇵🇸', '🇵🇦', '🇵🇬', '🇵🇾', '🇵🇪', '🇵🇭', '🇵🇳', '🇵🇱', '🇵🇹', '🇵🇷', '🇶🇦', '🇷🇴', '🇷🇺', '🇷🇼', '🇷🇪', '🇼🇸', '🇸🇲',
            '🇸🇦', '🇸🇳', '🇷🇸', '🇸🇨', '🇸🇱', '🇸🇬', '🇸🇰', '🇸🇮', '🇸🇧', '🇸🇴', '🇿🇦', '🇬🇸', '🇰🇷', '🇸🇸', '🇪🇸', '🇱🇰', '🇸🇩',
            '🇸🇷', '🇸🇯', '🇸🇪', '🇨🇭', '🇸🇾', '🇹🇼', '🇹🇯', '🇹🇿', '🇹🇭', '🇹🇱', '🇹🇬', '🇹🇰', '🇹🇴', '🇹🇹', '🇹🇳', '🇹🇷', '🇹🇲',
            '🇹🇨', '🇹🇻', '🇺🇬', '🇺🇦', '🇦🇪', '🇬🇧', '🇺🇸', '🇻🇮', '🇺🇾', '🇺🇿', '🇻🇺', '🇻🇦', '🇻🇪', '🇻🇳', '🇾🇪', '🇿🇲', '🇿🇼',
            '🏴', '🏳️‍🌈', '🏴‍☠️', '🏳️‍⚧️', '🏴‍☠️'
        ]
    },
];

const DotSymbolSelector = () => {
    const [selectedDots, setSelectedDots] = useState('');
    const [copiedDot, setCopiedDot] = useState(null);
    const [isProtected, setIsProtected] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const categoryRefs = useRef([]);
    const stickyBoxRef = useRef(null);

    const handleDotClick = useCallback((dot) => {
        if (isProtected) return;

        setIsProtected(true);
        setSelectedDots(prev => prev + dot);
        navigator.clipboard.writeText(dot)
            .then(() => {
                setCopiedDot(dot);
                setTimeout(() => setCopiedDot(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err))
            .finally(() => {
                setTimeout(() => setIsProtected(false), 100);
            });
    }, [isProtected]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(selectedDots)
            .then(() => {
                setCopiedDot('all');
                setTimeout(() => setCopiedDot(null), 1000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }, [selectedDots]);

    const handleClear = useCallback(() => {
        setSelectedDots('');
    }, []);

    const scrollToCategory = (index) => {
        const stickyBoxHeight = stickyBoxRef.current ? stickyBoxRef.current.offsetHeight : 0;
        const categoryElement = categoryRefs.current[index];
        if (categoryElement) {
            const elementPosition = categoryElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - stickyBoxHeight - 20; // 20px extra padding
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (stickyBoxRef.current) {
                if (window.pageYOffset > 100) {
                    stickyBoxRef.current.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-10');
                    setIsSticky(true);
                } else {
                    stickyBoxRef.current.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-10');
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (<>
        <div className="max-w-7xl m-auto p-4">
            <div ref={stickyBoxRef} className="mb-4 transition-all duration-300 bg-white">
                <div className="relative p-4 rounded-md">
                    <textarea
                        value={selectedDots}
                        onChange={(e) => setSelectedDots(e.target.value)}
                        className="rounded-md p-4 w-full focus:ring-1 outline-none focus:ring-sky-500 border focus:border-sky-300 ring-zinc-400/75 shadow-sm hover:ring-sky-300 bg-zinc-50 shadow-zinc-600"
                        placeholder="Click dots to add or type here"
                    />
                    <div className="absolute top-5 right-5 flex gap-2">
                        <button onClick={handleCopy} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <Copy size={16} />
                        </button>
                        <button onClick={handleClear} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <X size={16} />
                        </button>
                    </div>
                    {copiedDot === 'all' && (
                        <div className={`absolute ${isSticky ? 'bottom-[-2rem]' : 'top-[-2rem]'} left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded z-20`}>
                            Copied all dots!
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center pt-4 overflow-x-auto" style={{ width: '100%', whiteSpace: 'nowrap' }}>

                <Link href="/" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Fancy Font
                </Link>



                <Link href="/emoji/arrow-emoji" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Arrow Emoji
                </Link>

                <Link href="/bullet-point-symbol" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Bullet Point Symbol
                </Link>

                <Link href="/zalgo-text" className="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Zalgo Text
                </Link>

            </div>



            <div className="mb-6 ">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Quick Navigation</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {dotSymbols.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCategory(index)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                        >
                            {category.category}
                        </button>
                    ))}
                </div>








                {dotSymbols.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-6" ref={el => categoryRefs.current[categoryIndex] = el}>
                        <h4 className="text-md font-semibold mb-2 text-gray-600">{category.category}</h4>
                        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 lg:grid-cols-25 gap-2">
                            {category.symbols.map((dot, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-center justify-center bg-white p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => handleDotClick(dot)}
                                >
                                    <span className="text-lg">{dot}</span>
                                    {copiedDot === dot && (
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                                            Copied!
                                        </div>
                                    )}


                                </div>



                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl xl:mx-auto text-left mx-4">
                <h1 className="pt-2 font-semibold text-xl">Discord Emoji: Expressing Yourself in the Digital Age</h1>
                <p className="pt-1">In online communication, emojis have become essential for conveying emotions, ideas, and reactions. Discord, a popular platform for communities and gamers, offers many emojis to enhance conversations. Let&apos;s dive into the colorful world of Discord emojis and explore the various categories that bring life to your chats.</p>

                <h2 className="pt-2 font-semibold text-lg">1. Smileys & Emotion: The Heart of Expression</h2>
                <p className="pt-1">Smileys and emotional emojis are the cornerstone of digital communication. These little faces help convey tone and feeling in text-based conversations, making your messages more engaging and relatable.</p>
                <p className="pt-1">Example: 😊 (smiling face with smiling eyes) - Use this emoji to express genuine happiness or contentment in your Discord conversations.</p>

                <h2 className="pt-2 font-semibold text-lg">2. People & Body: Representing Diversity</h2>
                <p className="pt-1">The people and body category showcases the diversity of human expression and gestures. These emojis allow users to represent themselves and others in various poses and activities.</p>
                <p className="pt-1">Example: 🤷‍♀️ (woman shrugging) - Perfect for expressing uncertainty or a lack of knowledge about a topic in your Discord chats.</p>

                <h2 className="pt-2 font-semibold text-lg">3. Animal & Nature: Bringing the Outdoors In</h2>
                <p className="pt-1">Animal and nature emojis add a touch of the natural world to your digital conversations. From cute critters to majestic landscapes, these emojis help paint vivid pictures with just a single character.</p>
                <p className="pt-1">Example: 🦋 (butterfly) - Use this emoji to symbolize transformation, beauty, or to add a splash of color to your Discord messages.</p>

                <h2 className="pt-2 font-semibold text-lg">4. Food & Drink: Satisfying Digital Cravings</h2>
                <p className="pt-1">Food and drink emojis are perfect for discussing culinary delights, planning meals, or expressing hunger. These mouth-watering icons add flavor to your Discord conversations.</p>
                <p className="pt-1">Example: 🍕 (pizza) - Ideal for coordinating pizza night with your Discord friends or expressing your love for this popular dish.</p>

                <h2 className="pt-2 font-semibold text-lg">5. Travel & Places: Exploring the World</h2>
                <p className="pt-1">Travel and places emojis allow you to share your wanderlust or describe locations without words. These icons can instantly transport your Discord conversations across the globe.</p>
                <p className="pt-1">Example: 🗼 (Tokyo tower) - Use this emoji to discuss Japan, indicate a meetup location, or express your desire to visit Tokyo.</p>

                <h2 className="pt-2 font-semibold text-lg">6. Activities: Showcasing Hobbies and Interests</h2>
                <p className="pt-1">Activity emojis represent various hobbies, sports, and pastimes. These icons are great for organizing events or sharing your interests with your Discord community.</p>
                <p className="pt-1">Example: 🎮 (video game) - Perfect for gamers to indicate they&apos;re playing or to organize a gaming session with Discord friends.</p>

                <h2 className="pt-2 font-semibold text-lg">7. Objects: Everyday Items in Digital Form</h2>
                <p className="pt-1">Object emojis represent common items we encounter in our daily lives. These icons can quickly convey ideas or requests without typing out long descriptions.</p>
                <p className="pt-1">Example: 💡 (light bulb) - Use this emoji to indicate a new idea or a moment of realization in your Discord discussions.</p>

                <h2 className="pt-2 font-semibold text-lg">8. Symbols: Conveying Abstract Concepts</h2>
                <p className="pt-1">Symbol emojis represent abstract ideas, mathematical concepts, or commonly used signs. These icons can add clarity and emphasis to your Discord messages.</p>
                <p className="pt-1">Example: ❗ (exclamation mark) - Ideal for emphasizing important points or expressing urgency in your Discord conversations.</p>

                <h2 className="pt-2 font-semibold text-lg">9. Flags: Celebrating Global Diversity</h2>
                <p className="pt-1">Flag emojis represent countries, regions, and other geographic entities. These icons perfectly express national pride or indicate language preferences in international Discord servers.</p>
                <p className="pt-1">Example: 🏴‍☠️ (pirate flag) - Use this playful emoji to set a fun tone in gaming-related Discord chats or to organize themed events.</p>

                <h2 className="pt-2 font-semibold text-lg">Enhancing Your Discord Experience with Emojis</h2>
                <p className="pt-1">Emojis on Discord serve multiple purposes:</p>
                <ol className="list-decimal list-inside pl-4">
                    <li>Emotional Expression: They help convey tone and emotion in text-based communication.</li>
                    <li>Cultural Exchange: Emojis can bridge language barriers and facilitate understanding between users from different backgrounds.</li>
                    <li>Community Building: Custom emojis can create a sense of belonging and shared identity within Discord servers.</li>
                    <li>Efficient Communication: A single emoji can often replace several words, making conversations more concise and engaging.</li>
                </ol>

                <p className="pt-2">To make the most of Discord emojis:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Familiarize Yourself: Explore the emoji picker and learn the various categories.</li>
                    <li>Context is Key: Use emojis appropriate for the conversation and the server&apos;s culture.</li>
                    <li>Custom Emojis: Many Discord servers offer custom emojis. Learn and use these to show you&apos;re an active community member.</li>
                    <li>Emoji Reactions: Utilize emoji reactions to quickly respond to messages without cluttering the chat.</li>
                </ul>

                <h2 className="pt-2 font-semibold text-lg">Conclusion: The Power of Visual Communication</h2>
                <p className="pt-1">Discord emojis have revolutionized online communication, allowing users to express themselves more vividly and efficiently. From simple smileys to complex custom designs, these small icons convey emotions, ideas, and reactions.</p>
                <p className="pt-1">As you navigate the colorful world of Discord, remember that emojis are more than just fun additions to your messages. They&apos;re a language of their own, capable of transcending cultural and linguistic barriers. So explore the vast array of Discord emojis, and let your conversations come to life with these expressive digital icons!</p>
                <p className="pt-2">Whether coordinating a gaming session with the 🎮 emoji, sharing your travel dreams with 🗼, or simply brightening someone&apos;s day with a 😊, Discord emojis are here to make your online interactions more engaging, efficient, and enjoyable. Happy chatting!</p>
            </div>

        </div>
    </>





    );
};

export default DotSymbolSelector;