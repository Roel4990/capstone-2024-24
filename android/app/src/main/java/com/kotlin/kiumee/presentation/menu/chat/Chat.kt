package com.kotlin.kiumee.presentation.menu.chat

data class Chat(
    val type: Int,
    val content: String,
    val button: List<String>? = null
)
