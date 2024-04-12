package com.kotlin.kiumee.data.api

import com.kotlin.kiumee.core.util.KeyStorage.BUSINESS
import com.kotlin.kiumee.core.util.KeyStorage.BUSINESS_ID
import com.kotlin.kiumee.core.util.KeyStorage.ITEMS
import com.kotlin.kiumee.core.util.KeyStorage.V1
import com.kotlin.kiumee.data.dto.response.ResponseItemsDto
import retrofit2.http.GET
import retrofit2.http.Path

interface ItemsApiService {
    @GET("$V1/$BUSINESS/{$BUSINESS_ID}/$ITEMS")
    suspend fun getItems(
        @Path(value = BUSINESS_ID) businessId: Int
    ): ResponseItemsDto
}
