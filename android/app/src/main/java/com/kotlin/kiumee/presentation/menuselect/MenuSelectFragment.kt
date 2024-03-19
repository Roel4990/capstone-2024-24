package com.kotlin.kiumee.presentation.menuselect

import com.google.android.material.tabs.TabLayoutMediator
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentMenuSelectBinding
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishFragment

class MenuSelectFragment :
    BindingFragment<FragmentMenuSelectBinding>(R.layout.fragment_menu_select) {
    override fun initView() {
        //initTabPager()
        initPayBtnClickListener()
    }

//    private fun initTabPager() {
//        val tabLayout = binding.layoutFragmentMenuSelectTab
//        val viewPager = binding.vpMenuSelect
//
//        val menuTabAdapter = MenuSelectAdapter(this)
//        viewPager.adapter = menuTabAdapter
//
//        val tabs = listOf(
//            "커피(HOT)",
//            "커피(ICE)",
//            "에이드&티",
//            "음료",
//            "디저트"
//        )
//
//        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
//            tab.text = tabs[position]
//        }.attach()
//    }

    private fun initPayBtnClickListener() {
        binding.btnMenuSelectCartPay.setOnClickListener {
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fcv_chat, OrderFinishFragment())
                addToBackStack(null) // 뒤로 가기 동작을 위해 백스택에 추가
                commit()
            }
        }
    }
}
