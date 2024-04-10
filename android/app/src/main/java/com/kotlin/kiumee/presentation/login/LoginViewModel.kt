package com.kotlin.kiumee.presentation.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.data.dto.ServicePool
import com.kotlin.kiumee.data.dto.request.RequestLoginDto
import com.kotlin.kiumee.data.dto.response.ResponseLoginDto
import com.kotlin.kiumee.presentation.MainApplication
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class LoginViewModel() : ViewModel() {
    private val _postLogin = MutableStateFlow<UiState<ResponseLoginDto>>(UiState.Loading)
    val postLogin: StateFlow<UiState<ResponseLoginDto>> = _postLogin

    fun postLogin(username: String, password: String) = viewModelScope.launch {
        runCatching {
            ServicePool.loginApiService.postLogin(RequestLoginDto(username, password))
        }.fold(
            {
                _postLogin.value = UiState.Success(it).apply {
                    MainApplication.prefs.setAccessToken(it.token.accessToken)
                }
            },
            { _postLogin.value = UiState.Failure(it.message.toString()) }
        )
    }
}
