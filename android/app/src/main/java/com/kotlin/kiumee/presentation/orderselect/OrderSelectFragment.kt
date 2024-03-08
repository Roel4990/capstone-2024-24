package com.kotlin.kiumee.presentation.orderselect

import androidx.fragment.app.Fragment
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentOrderSelectBinding
import com.kotlin.kiumee.presentation.menuselect.MenuSelectFragment

class OrderSelectFragment :
    BindingFragment<FragmentOrderSelectBinding>(R.layout.fragment_order_select) {
    override fun initView() {
        initStoreBtnClickListener()
        initTakeawayBtnClickListener()
    }

    private fun initStoreBtnClickListener() {
        binding.btnOrderSelectStore.setOnClickListener {
            replaceFragment(MenuSelectFragment())
        }
    }

    private fun initTakeawayBtnClickListener() {
        binding.btnOrderSelectTakeaway.setOnClickListener {
            replaceFragment(MenuSelectFragment())
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        requireActivity().supportFragmentManager.beginTransaction().apply {
            replace(R.id.fcv_chat, fragment)
            addToBackStack(null) // 뒤로 가기 동작을 위해 백스택에 추가
            commit()
        }
    }
}
