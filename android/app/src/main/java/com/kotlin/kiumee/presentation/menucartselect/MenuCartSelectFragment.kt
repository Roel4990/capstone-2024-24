package com.kotlin.kiumee.presentation.menucartselect

import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentMenuCartSelectBinding
import com.kotlin.kiumee.presentation.menuselect.MenuSelectFragment

class MenuCartSelectFragment :
    BindingFragment<FragmentMenuCartSelectBinding>(R.layout.fragment_menu_cart_select) {
    override fun initView() {
        initNoBtnClickListener()
        initYesBtnClickListener()
    }

    private fun initYesBtnClickListener() {
        binding.btnMenuCartSelectYes.setOnClickListener {
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fcv_chat, MenuSelectFragment())
                addToBackStack(null) // 뒤로 가기 동작을 위해 백스택에 추가
                commit()
            }
        }
    }

    private fun initNoBtnClickListener() {
        binding.btnMenuCartSelectNo.setOnClickListener {
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fcv_chat, MenuSelectFragment())
                addToBackStack(null) // 뒤로 가기 동작을 위해 백스택에 추가
                commit()
            }
        }
    }
}
