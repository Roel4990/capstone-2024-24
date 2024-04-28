package com.kotlin.kiumee.data.api

import com.kotlin.kiumee.core.util.KeyStorage.BUSINESS
import com.kotlin.kiumee.core.util.KeyStorage.V1
import com.kotlin.kiumee.data.dto.response.ResponseBusinessDto
import retrofit2.http.GET

interface BusinessApiService {
    @GET("$V1/$BUSINESS")
    suspend fun getBusiness(): ResponseBusinessDto
}
