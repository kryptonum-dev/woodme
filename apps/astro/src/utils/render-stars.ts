export const renderStars = (rating: number = 0) => {
  const fixedRating = Number(rating.toFixed(1));
  const fullStars = Math.floor(fixedRating);
  const isHalfStar = (i: number) => i + 1 === fullStars && fixedRating - fullStars > 0.5;

  const halfStar = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
        <path stroke="#DBCDA3" stroke-linecap="round" stroke-linejoin="round" d="M7.522 2.303c.154-.311.23-.467.335-.517a.333.333 0 0 1 .287 0c.104.05.181.206.335.517l1.458 2.953c.045.092.068.138.1.174.03.031.065.057.104.075.045.02.095.028.197.043l3.26.477c.344.05.516.075.595.159.07.073.102.173.089.273-.015.114-.14.235-.388.477l-2.36 2.298a.732.732 0 0 0-.133.15.333.333 0 0 0-.04.122c-.006.048.003.099.02.2l.557 3.245c.059.342.088.513.033.615a.333.333 0 0 1-.232.168c-.114.022-.268-.06-.575-.22L8.25 11.977c-.09-.048-.136-.072-.184-.081a.334.334 0 0 0-.128 0c-.048.01-.094.033-.185.081l-2.915 1.533c-.307.162-.46.243-.574.222a.333.333 0 0 1-.233-.17c-.055-.1-.025-.272.033-.614l.557-3.245a.729.729 0 0 0 .02-.2.333.333 0 0 0-.04-.122.729.729 0 0 0-.134-.15L2.108 6.934c-.249-.242-.373-.363-.388-.477-.013-.1.019-.2.088-.273.08-.084.251-.11.595-.16l3.26-.476c.102-.015.153-.022.197-.043a.333.333 0 0 0 .103-.075c.034-.036.056-.082.102-.174l1.457-2.953Z"/><path fill="#DBCDA3" d="M8 1.754a.333.333 0 0 0-.143.032c-.104.05-.18.206-.335.517L6.065 5.256c-.046.092-.068.138-.102.174a.333.333 0 0 1-.103.075c-.044.02-.095.028-.196.043l-3.261.477c-.344.05-.515.075-.595.159a.333.333 0 0 0-.088.273c.015.114.14.235.388.477l2.358 2.298c.074.071.11.107.134.15.021.038.035.079.04.122a.729.729 0 0 1-.02.2l-.557 3.245c-.058.342-.088.513-.033.615.048.088.134.15.233.168.113.022.267-.06.574-.22l2.915-1.534c.091-.048.137-.072.185-.081A.33.33 0 0 1 8 11.891V1.754Z"/>
      </svg>`;

  const fullStar = (empty: boolean = false) => `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
        <path stroke="#DBCDA3" fill="${empty ? 'none' : '#DBCDA3'}" d="M7.522 2.303c.154-.311.23-.467.335-.517a.333.333 0 0 1 .287 0c.104.05.181.206.335.517l1.458 2.953c.045.092.068.138.1.174.03.031.065.057.104.075.045.02.095.028.197.043l3.26.477c.344.05.516.075.595.159.07.073.102.173.089.273-.015.114-.14.235-.388.477l-2.359 2.298a.73.73 0 0 0-.134.15.333.333 0 0 0-.04.122c-.006.048.003.099.02.2l.557 3.245c.059.342.088.513.033.615a.333.333 0 0 1-.232.168c-.114.022-.268-.06-.575-.22L8.25 11.977c-.09-.048-.136-.072-.184-.081a.334.334 0 0 0-.128 0c-.048.01-.094.033-.185.081l-2.915 1.533c-.307.162-.46.243-.574.222a.333.333 0 0 1-.233-.17c-.055-.1-.025-.272.033-.614l.557-3.245a.729.729 0 0 0 .02-.2.333.333 0 0 0-.04-.122.729.729 0 0 0-.134-.15L2.108 6.934c-.249-.242-.373-.363-.388-.477-.013-.1.019-.2.088-.273.08-.084.251-.11.595-.16l3.26-.476c.102-.015.153-.022.197-.043a.333.333 0 0 0 .103-.075c.034-.036.056-.082.102-.174l1.457-2.953Z"/>
      </svg>
      `;

  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
        <path fill="#DBCDA3" d="M7.522 2.303c.154-.311.23-.467.335-.517a.333.333 0 0 1 .287 0c.104.05.181.206.335.517l1.458 2.953c.045.092.068.138.1.174.03.031.065.057.104.075.045.02.095.028.197.043l3.26.477c.344.05.516.075.595.159.07.073.102.173.089.273-.015.114-.14.235-.388.477l-2.359 2.298a.73.73 0 0 0-.134.15.333.333 0 0 0-.04.122c-.006.048.003.099.02.2l.557 3.245c.059.342.088.513.033.615a.333.333 0 0 1-.232.168c-.114.022-.268-.06-.575-.22L8.25 11.977c-.09-.048-.136-.072-.184-.081a.334.334 0 0 0-.128 0c-.048.01-.094.033-.185.081l-2.915 1.533c-.307.162-.46.243-.574.222a.333.333 0 0 1-.233-.17c-.055-.1-.025-.272.033-.614l.557-3.245a.729.729 0 0 0 .02-.2.333.333 0 0 0-.04-.122.729.729 0 0 0-.134-.15L2.108 6.934c-.249-.242-.373-.363-.388-.477-.013-.1.019-.2.088-.273.08-.084.251-.11.595-.16l3.26-.476c.102-.015.153-.022.197-.043a.333.333 0 0 0 .103-.075c.034-.036.056-.082.102-.174l1.457-2.953Z"/>
      </svg>
      ${[...Array(4)].map((_, i) => (isHalfStar(i) ? halfStar : fullStar(i + 2 > fullStars))).join('')}
    `;
};
