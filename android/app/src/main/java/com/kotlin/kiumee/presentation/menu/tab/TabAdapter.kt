package com.kotlin.kiumee.presentation.menu.tab

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter

class TabAdapter(fm: FragmentManager, lifecycle: Lifecycle, private val menuList: List<String>) :
    FragmentStateAdapter(fm, lifecycle) {

    override fun getItemCount(): Int = menuList.size

    override fun createFragment(position: Int): Fragment {
        return TabFragment.newInstance(position)
    }
}
