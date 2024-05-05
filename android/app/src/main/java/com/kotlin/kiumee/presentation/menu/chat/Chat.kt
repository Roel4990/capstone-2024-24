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

// data class Chat(
//    val viewType: Int,
//    val result: String,
//    val suggestItems: List<String>? = null,
//    val orderInfo: ChatOrderInfo,
//    val pointerId: Int? = 0,
//    val doBilling: Boolean? = false,
//    val showOrderList: Boolean? = false,
//    val totalPrice: Int? = 0
// ) {
//    companion object {
//        const val VIEW_TYPE_JUMI = 0
//        const val VIEW_TYPE_USER = 1
//    }
// }
//
// data class ChatOrderInfo(
//    val items: List<ChatItems>
// )
//
// data class ChatItems(
//    val id: Int,
//    val category: String,
//    val name: String,
//    val price: Int,
//    val quantity: Int
// )
