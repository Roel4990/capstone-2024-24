package com.kotlin.kiumee.presentation

import android.app.Application
import com.kotlin.kiumee.data.dto.PreferenceUtil

class MainApplication : Application() {
    companion object {
        lateinit var prefs: PreferenceUtil
    }

    override fun onCreate() {
        super.onCreate()
        prefs = PreferenceUtil(applicationContext)
    }
}
