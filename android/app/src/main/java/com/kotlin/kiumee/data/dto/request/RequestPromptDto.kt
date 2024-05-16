package com.kotlin.kiumee.data.dto.request

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class RequestPromptDto(
    @SerialName("query")
    val query: String,
    @SerialName("orderInfo")
    val orderInfo: RequestPromptOrderInfoDto
)

@Serializable
data class RequestPromptOrderInfoDto(
    @SerialName("items")
    val items: List<RequestPromptOrderInfoItemsDto>
)

@Serializable
data class RequestPromptOrderInfoItemsDto(
    @SerialName("id")
    val id: Int,
    @SerialName("quantity")
    val quantity: Int
)
