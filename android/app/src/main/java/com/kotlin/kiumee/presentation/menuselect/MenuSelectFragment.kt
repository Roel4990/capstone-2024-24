package com.kotlin.kiumee.presentation.menuselect

import android.content.Intent
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentMenuSelectBinding
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishActivity

class MenuSelectFragment :
    BindingFragment<FragmentMenuSelectBinding>(R.layout.fragment_menu_select) {
    override fun initView() {
        // initTabPager()
        initOrderBtnClickListener()
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

    private fun initOrderBtnClickListener() {
        binding.btnMenuSelectCartOrder.setOnClickListener {
            startActivity(Intent(context, OrderFinishActivity::class.java))
        }
    }
}
