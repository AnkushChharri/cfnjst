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

            <div className="max-w-7xl xl:!mx-auto *:!text-left !mx-4">

                <h1 className="pt-2 font-semibold text-xl"> Discord Emoji: Enhancing Your Server&apos;s Communication and Engagement</h1>
                <p>In the vibrant world of online communication, Discord has emerged as a powerhouse platform for communities of all sizes. One of its most beloved features is the use of emojis, which add a layer of expression and fun to conversations. This comprehensive guide will delve into the world of Discord emoji, exploring their types, uses, and impact on server engagement.</p>

                <h1 className="pt-2 font-semibold text-xl"> What Are Discord Emojis? </h1>
                <p> Discord emojis are small digital images or icons used to express emotions, reactions, or ideas in text-based conversations. They come in various forms and can significantly enhance the way users interact within a Discord server. </p>

                <h1 className="pt-2 font-semibold text-xl"> Types of Discord Emojis </h1>
                <p> 1. Standard Emojis: These are the default emojis available on all Discord servers, similar to those found on most messaging platforms. </p>
                <p> 2. Custom Emojis: Unique to Discord, these are user-created emojis that can be uploaded to a server, allowing for personalized and branded expressions. </p>
                <p> 3. Animated Emojis: These are GIF-like emojis that add movement and extra flair to conversations. </p>


                <h1 className="pt-2 font-semibold text-xl"> The Power of Custom Discord Emojis </h1>
                <p> Custom emojis are a game-changer for Discord communities. They allow server owners and administrators to create a unique identity and culture within their space. Here&apos;s why they&apos;re so impactful: </p>
                <p> 1. **Brand Identity**: For businesses and content creators, custom emojis can incorporate logos or mascots, reinforcing brand recognition. </p>
                <p> 2. **Community Inside Jokes**: Custom emojis can represent shared experiences or humor within a community, fostering a sense of belonging. </p>
                <p> 3. **Improved Engagement**: Unique and fun emojis encourage users to interact more, leading to increased activity on the server. </p>
                <p> 4. **Rewards and Incentives**: Some servers use exclusive emojis as rewards for active members or supporters, creating a tiered system of engagement. </p>



                <h1 className="pt-2 font-semibold text-xl"> How to Create and Use Custom Discord Emojis </h1>
                <p> Creating custom emojis for your Discord server is a straightforward process: </p>
                <p> 1. Prepare Your Image: Create or select an image that&apos;s 128x128 pixels or smaller, not exceeding 256KB.</p>
                <p> 2. Upload the Emoji: In your server settings, navigate to the &quot;Emoji&quot; tab and click &quot;Upload Emoji.&quot; </p>
                <p> 3. Name Your Emoji: Give your new emoji a unique name that users can easily remember and type.</p>
                <p> 4. Use Your Emoji: To use the new emoji in chat, type `:emojiname:` or select it from the emoji picker.</p>


                <h1 className="pt-2 font-semibold text-xl"> Best Practices for Discord Emoji Usage </h1>
                <p> To maximize the impact of emojis in your Discord server, consider these best practices: </p>
                <p> 1. Maintain Quality: Ensure your custom emojis are clear and easily recognizable, even at small sizes. </p>
                <p> 2. Stay Relevant: Create emojis that align with your server&apos;s theme or purpose. </p>
                <p> 3. Regularly Update: Keep your emoji selection fresh by adding new ones periodically and removing outdated or unused ones. </p>
                <p> 4. Encourage Usage: Promote your custom emojis by using them in announcements or creating emoji-based events. </p>
                <p> 5. Consider Accessibility: Remember that not all users may be able to see or understand certain emojis, so use them to enhance, not replace, clear communication. </p>


                <h1 className="pt-2 font-semibold text-xl"> The Impact of Emojis on Server Engagement </h1>
                <p> Emojis do more than just add visual flair to conversations. They can significantly impact user engagement and community dynamics: </p>
                <p> 1. Increased Interaction: Emojis make conversations more inviting and can encourage shy users to participate. </p>
                <p> 2. Clearer Communication: Emojis can help convey tone and intent, reducing misunderstandings in text-based chats. </p>
                <p> 3. Faster Responses: Reaction emojis allow users to quickly respond to messages without typing, increasing overall engagement. </p>
                <p> 4. Community Building: Shared custom emojis create a sense of in-group language and culture, strengthening community bonds. </p>

                <h1 className="pt-2 font-semibold text-xl"> Discord Nitro and Emoji Perks </h1>
                <p> Discord Nitro, the platform&apos;s premium subscription service, offers additional emoji-related benefits: </p>
                <p> 1. Animated Avatars and Emojis: Nitro users can use animated profile pictures and emojis. </p>
                <p> 2. Global Custom Emojis: Nitro subscribers can use custom emojis from any server they&apos;re a part of, anywhere on Discord. </p>
                <p> 3. Higher Upload Limits: Nitro boosts the file size limit for emoji uploads, allowing for higher quality custom emojis. </p>


                <h1 className="pt-2 font-semibold text-xl"> Conclusion: Emojis as a Community-Building Tool </h1>
                <p> Discord emojis, particularly custom ones, are more than just fun additions to your server. They&apos;re powerful tools for building community, expressing identity, and fostering engagement. By thoughtfully implementing and managing your server&apos;s emoji selection, you can create a more vibrant, expressive, and connected community. </p>
                <p> Whether you&apos;re running a gaming server, a brand community, or a social group, mastering the art of Discord emojis can take your server to the next level. So start creating, sharing, and enjoying the wonderful world of Discord emojis today! </p>
            </div>

        </div>
    </>





    );
};

export default DotSymbolSelector;