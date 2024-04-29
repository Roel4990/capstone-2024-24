package com.kotlin.kiumee.presentation.menu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kotlin.kiumee.MainApplication
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.data.dto.ServicePool
import com.kotlin.kiumee.data.dto.request.RequestBillingDto
import com.kotlin.kiumee.data.dto.request.RequestBillingItemsDto
import com.kotlin.kiumee.data.dto.response.ResponseBillingDto
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MenuViewModel : ViewModel() {
    private val _getMenu = MutableStateFlow<UiState<List<CategoryEntity>>>(UiState.Loading)
    val getMenu: StateFlow<UiState<List<CategoryEntity>>> = _getMenu

    private val _putBilling = MutableStateFlow<UiState<ResponseBillingDto>>(UiState.Empty)
    val putBilling: StateFlow<UiState<ResponseBillingDto>> = _putBilling

    init {
        getCategory()
    }

    private fun getCategory() = viewModelScope.launch {
        runCatching {
            ServicePool.menuApiService.getItems(MainApplication.prefs.getBusinessId()).data.map { it.toCategoryEntity() }
        }.fold(
            { _getMenu.value = UiState.Success(it) },
            { _getMenu.value = UiState.Failure(it.message.toString()) }
        )
    }

    fun putBilling(billingData: List<RequestBillingItemsDto>) = viewModelScope.launch {
        kotlin.runCatching {
            ServicePool.menuApiService.putBilling(
                MainApplication.prefs.getBusinessId(),
                MainApplication.prefs.getSessionId(),
                RequestBillingDto(billingData)
            )
        }.fold(
            { _putBilling.value = UiState.Success(it) },
            { _putBilling.value = UiState.Failure(it.message.toString()) }
        )
    }
}
