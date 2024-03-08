package com.kotlin.kiumee.presentation.menuselect

import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentMenuSelectBinding
import com.kotlin.kiumee.presentation.menucartselect.MenuCartSelectFragment

class MenuSelectFragment :
    BindingFragment<FragmentMenuSelectBinding>(R.layout.fragment_menu_select) {
    override fun initView() {
        binding.btnMenuSelectTest.setOnClickListener {
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fcv_chat, MenuCartSelectFragment())
                addToBackStack(null) // 뒤로 가기 동작을 위해 백스택에 추가
                commit()
            }
        }
    }
}
