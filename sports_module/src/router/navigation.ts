export const navigateTo = (route: Object) => {
    const evt = new CustomEvent("remoteNavigateTo", {detail: route});
    document.dispatchEvent(evt);
};

export const navigateBack = () => {
    const evt = new CustomEvent("remoteNavigateBack", {});
    document.dispatchEvent(evt);
};