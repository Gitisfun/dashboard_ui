function showModal(context, modal, action) {
    context.$buefy.modal.open({
      parent: context,
      component: modal,
      hasModalCard: false,
      trapFocus: true,
      canCancel: true,
      fullScreen: false,
      events: {
        confirmation: (value) => {
          action(value);
        },
      },
    });
}

function showModalWithParamas(context, modal, title, passedObj, action) {
  context.$buefy.modal.open({
    parent: context,
    component: modal,
    props: { obj: passedObj, title: title },
    hasModalCard: false,
    trapFocus: true,
    canCancel: true,
    fullScreen: false,
    events: {
      confirmation: (value) => {
        action(value);
      },
    },
  });
}

export { showModal, showModalWithParamas }