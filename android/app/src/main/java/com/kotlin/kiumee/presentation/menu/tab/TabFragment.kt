package com.kotlin.kiumee.presentation.menu.tab

import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentTabBinding
import com.kotlin.kiumee.presentation.menu.Menu
import com.kotlin.kiumee.presentation.menu.MenuAdapter

class TabFragment : BindingFragment<FragmentTabBinding>(R.layout.fragment_tab) {
    private var tabPosition: Int = 0

    override fun initView() {
        arguments?.getInt(ARG_TAB_POSITION)?.let {
            tabPosition = it
        }

        // 탭에 따른 데이터 설정
        val data = fetchDataForTab(tabPosition)
        binding.rvTab.adapter = MenuAdapter(click = { menu, position ->
            // 여기에 추후 추가하기
        }).apply {
            submitList(data)
        }

        binding.rvTab.layoutManager =
            LinearLayoutManager(binding.root.context, LinearLayoutManager.VERTICAL, false)
    }

    private fun fetchDataForTab(tabPosition: Int): List<Menu> {
        // 탭에 따른 데이터를 가져와서 반환
        return when (tabPosition) {
            0 -> listOf(
                Menu("1", 1, "1"),
                Menu("1", 1, "1")
            )

            1 -> listOf(
                Menu("2", 2, "2"),
                Menu("2", 2, "2")
            )

            else -> emptyList()
        }
    }

    companion object {
        private const val ARG_TAB_POSITION = "tab_position"

        fun newInstance(tabPosition: Int): TabFragment {
            val fragment = TabFragment()
            val args = Bundle()
            args.putInt(ARG_TAB_POSITION, tabPosition)
            fragment.arguments = args
            return fragment
        }
    }
}
