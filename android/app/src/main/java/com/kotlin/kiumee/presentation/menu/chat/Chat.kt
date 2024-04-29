package com.kotlin.kiumee.presentation.menu.chat

data class Chat(
    val viewType: Int,
    val content: String,
    val button: List<String>? = null
) {
    companion object {
        const val VIEW_TYPE_JUMI = 0
        const val VIEW_TYPE_USER = 1
    }
}
