import { DropdownInstance, InputInstance } from 'element-plus';

export function useInuts() {
    const selectField = async (inputRef: InputInstance | DropdownInstance | undefined) => {
        await nextTick(() => {
            if (!inputRef) {
                return;
            }

            inputRef.focus();

            if (typeof inputRef.select === 'function') {
                nextTick(() => inputRef.select());
            }
        });
    };

    return {
        selectField,
    };
}
