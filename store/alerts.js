const ALERT_AUTO_DISMISS_TIMEOUT = 5000

let createId = () => {
  const nums = new Set();
  while(nums.size !== 4) {
    nums.add(Math.floor(Math.random() * 9) + 1);
  }

  return Array.from(nums).join("");
}

export const state = () => ({
  list: []
})


export const mutations = {
  add(state, alert) {
    state.list.push(alert);
  },

  remove(state, alert) {
    let alerts = state.list;

    let alertToRemove = alerts.indexOf(alerts.filter(a => a.Id === alert.Id)[0])

    if (alertToRemove === -1) {
      return;
    }

    state.list.splice(alertToRemove, 1);
  }
}


export const getters = {
  getAlerts: (state) => {
    return state.list
  }
}


export const actions = {
  constructAlert(context, payload) {
    let {response, alertType} = payload;
    let message;
    let list = [];

    if (typeof response === 'object') {
      message = response.message;

      if (response.fields) {
        response.fields.map((field) => {
          list.push(field);
        })
      }
    } else {
      message = response;
    }

    if (message.includes("<!DOCTYPE html>")){
      message = "A fatal error occurred!";
    }

    let alert = {
      Id: createId(),
      AlertType: alertType,
      Content: message,
      List: list
    };

    context.commit('add', alert);

    window.scrollTo({top: 0, behavior: 'smooth'});

    setTimeout(() => {
      context.commit('remove', alert);
    }, ALERT_AUTO_DISMISS_TIMEOUT)
  },
  warning({dispatch}, response) {
    dispatch('constructAlert', {response: response, alertType: 'warning'});
  },
  error({dispatch}, response) {
    dispatch('constructAlert', {response: response, alertType: 'error'});
  },
  success({dispatch}, response) {
    dispatch('constructAlert', {response: response, alertType: 'success'});
  },
}
