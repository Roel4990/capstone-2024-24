package com.kotlin.kiumee.presentation.menu.menuviewpager

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.viewModels
import androidx.lifecycle.flowWithLifecycle
import androidx.lifecycle.lifecycleScope
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.databinding.FragmentTabBinding
import com.kotlin.kiumee.presentation.menu.CategoryEntity
import com.kotlin.kiumee.presentation.menu.MenuActivity
import com.kotlin.kiumee.presentation.menu.MenuAdapter
import com.kotlin.kiumee.presentation.menu.MenuItemDecorator
import com.kotlin.kiumee.presentation.menu.MenuViewModel
import com.kotlin.kiumee.presentation.menu.cart.Cart
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import timber.log.Timber

class MenuViewPagerFragment : BindingFragment<FragmentTabBinding>(R.layout.fragment_tab) {
    private val menuViewModel by viewModels<MenuViewModel>()
    private var tabPosition: Int = 0
    private lateinit var menuAdapter: MenuAdapter

    override fun initView() {
        // initFragmentInstance()
        initObserve()
    }

//    private fun initFragmentInstance() {
//        arguments?.getInt(ARG_TAB_POSITION)?.let {
//            tabPosition = it
//        }
//    }

    private fun initObserve() {
        menuViewModel.getMenu.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> {
                    initMenuViewPagerAdapter(it.data)
                }

                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> Timber.d("로딩중")
            }
        }.launchIn(lifecycleScope)
    }

    private fun initMenuViewPagerAdapter(menuData: List<CategoryEntity>) {
        menuAdapter = MenuAdapter(click = { menu, position ->
            val newCartItem = Cart(menu.name, 1, menu.price)
            (activity as? MenuActivity)?.addCartItem(newCartItem)
        })
        menuAdapter.apply {
            // Log.e("hhere", tabPosition.toString())
            Log.e("hhhere", (activity as? MenuActivity)?.getLastClickedPosition().toString())
            submitList(
                menuData.getOrNull(
                    (activity as? MenuActivity)?.getLastClickedPosition() ?: 0
                )?.items
            )
        }
        binding.rvTab.adapter = menuAdapter
        binding.rvTab.addItemDecoration(MenuItemDecorator(requireContext()))
    }

    companion object {
        private const val ARG_TAB_POSITION = "tab_position"

        fun newInstance(tabPosition: Int): MenuViewPagerFragment {
            val fragment = MenuViewPagerFragment()
            val args = Bundle()
            args.putInt(ARG_TAB_POSITION, tabPosition)
            fragment.arguments = args
            return fragment
        }
    }
}
