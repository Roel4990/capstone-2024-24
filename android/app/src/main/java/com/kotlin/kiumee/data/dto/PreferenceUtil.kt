package com.kotlin.kiumee.data.dto

import android.content.Context
import android.content.SharedPreferences
import com.kotlin.kiumee.core.util.KeyStorage.ACCESS_TOKEN

class PreferenceUtil(context: Context) {
    private val prefs: SharedPreferences =
        context.getSharedPreferences("prefs_name", Context.MODE_PRIVATE)

    fun getAccessToken(): String {
        return prefs.getString(ACCESS_TOKEN, null).toString()
    }

    fun setAccessToken(accessToken: String) {
        prefs.edit().putString(ACCESS_TOKEN, accessToken).apply()
    }
}
