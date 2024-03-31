package com.kotlin.kiumee.presentation.menu.menuviewpager

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter

class MenuViewPagerAdapter(fm: FragmentManager, lifecycle: Lifecycle, private val tabList: List<String>) :
    FragmentStateAdapter(fm, lifecycle) {

    override fun getItemCount(): Int = tabList.size

    override fun createFragment(position: Int): Fragment {
        return MenuViewPagerFragment.newInstance(position)
    }
}
