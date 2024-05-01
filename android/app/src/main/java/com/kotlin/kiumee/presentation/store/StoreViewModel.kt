package com.kotlin.kiumee.presentation.store

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kotlin.kiumee.MainApplication
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.data.dto.ServicePool
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class StoreViewModel : ViewModel() {
    private val _getStore = MutableStateFlow<UiState<List<StoreEntity>>>(UiState.Loading)
    val getStore: StateFlow<UiState<List<StoreEntity>>> = _getStore

    init {
        getStore()
    }

    private fun getStore() = viewModelScope.launch {
        runCatching {
            ServicePool.businessApiService.getBusiness().data.map { it.toStoreEntity() }
        }.fold(
            { _getStore.value = UiState.Success(it) },
            { _getStore.value = UiState.Failure(it.message.toString()) }
        )
    }

    fun getBusinessId(businessId: Int) =
        viewModelScope.launch {
            MainApplication.prefs.setBusinessId(businessId)
        }
}
