import { ref } from 'vue'
import { getPermissionTree, putRolePermission } from '@/api/auth'
import type { TreeInstance } from 'types/elemntPlus'
import { useTable } from '@/components/Table'
import { userHooks } from '@/hooks/user'
const { refresh } = useTable()

const treeRef = ref<TreeInstance>()
const cellId = ref('')

const { getInfo } = userHooks()

export function useTree() {
  const optionsTree = ref([])

  const defaultProps = {
    children: 'children',
    label: 'name',
    disabled: 'disabled'
  }

  function handleSave() {
    putRolePermission({
      id: cellId.value,
      permissionIds: treeRef.value?.getCheckedKeys(false)
    }).then(_ => {
      refresh()
      //   //刷新用户权限
      getInfo()
    })
  }

  function getList() {
    getPermissionTree().then(res => {
      optionsTree.value = res
    })
  }

  const handleCellClick = row => {
    cellId.value = row.id
    const temp: string[] = []
    row.permissions.forEach(item => {
      temp.push(item.id)
    })

    treeRef.value?.setCheckedKeys(temp, false)
  }
  return {
    cellId,
    treeRef,
    optionsTree,
    defaultProps,
    getList,
    handleSave,
    handleCellClick
  }
}
