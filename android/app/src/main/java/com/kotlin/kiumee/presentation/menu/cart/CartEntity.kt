package com.kotlin.kiumee.presentation.menu.cart

import com.kotlin.kiumee.data.dto.request.RequestBillingItemsDto
import com.kotlin.kiumee.data.dto.request.RequestPromptOrderInfoItemsDto

data class CartEntity(
    val id: Int,
    val name: String,
    val count: Int,
    val price: Int
) {
    fun toRequestBillingItemsDto() = RequestBillingItemsDto(
        id,
        count
    )

    fun toRequestPromptOrderInfoItemsDto() = RequestPromptOrderInfoItemsDto(
        id,
        count
    )
}
