package com.kotlin.kiumee.presentation.menu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kotlin.kiumee.MainApplication
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.data.dto.ServicePool
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MenuViewModel : ViewModel() {
    private val _getMenu = MutableStateFlow<UiState<List<CategoryEntity>>>(UiState.Loading)
    val getMenu: StateFlow<UiState<List<CategoryEntity>>> = _getMenu

    init {
        getCategory()
    }

    private fun getCategory() = viewModelScope.launch {
        runCatching {
            ServicePool.itemsApiService.getItems(MainApplication.prefs.getBusinessId()).data.map { it.toCategoryEntity() }
        }.fold(
            { _getMenu.value = UiState.Success(it) },
            { _getMenu.value = UiState.Failure(it.message.toString()) }
        )
    }
}
