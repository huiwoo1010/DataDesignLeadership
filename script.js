const p_point = [
    [4, 2.5], [7.9, 1.5], [9, 1.7], [10.2, 2], [7.1, 2.7],
    [3.4, 5.3], [7.9, 6.6], [7.9, 4.4], [9.7, 6.6], [9.7, 4.4],
    [4.4, 10.4], [6.8, 8.8], [7.7, 10.8], [7.9, 8.8], [9.1, 8.8], [10.4, 8.4]
  ];
  const t_point = [
    [2.8, 1.5], [9.7, 1], [12.7, 3.3], [13.85, 6.3], [8.9, 5.45],
    [6.1, 5.3], [1.9, 9], [5.6, 9.8], [9.8, 9.8], [13, 8.5]
  ];
  const p_w = [6, 1, 1, 1, 1, 12, 5, 5, 5, 5, 7, 6, 4, 8, 5, 3];
  
  let min_dist = 1e9;
  let p_min_dist = Array(p_point.length).fill(1e9);
  let min_t_list = [];
  
  function dist_min(t_point) {
    p_min_dist = Array(p_point.length).fill(1e9);
    for (let i = 0; i < p_point.length; i++) {
      for (let t of t_point) {
        let p = p_point[i];
        let dist = Math.sqrt((p[0] - t[0]) ** 2 + (p[1] - t[1]) ** 2);
        if (p_min_dist[i] > dist) {
          p_min_dist[i] = dist;
        }
      }
    }
    let ret = 0;
    for (let i = 0; i < p_point.length; i++) {
      ret += p_min_dist[i] * Math.sqrt(p_w[i]);
    }
    return ret;
  }
  
  function solve(n, m, t_list) {
    if (n === 0) {
      let dist = dist_min(t_list);
      if (dist < min_dist) {
        min_dist = dist;
        min_t_list = t_list.slice();
      }
      return;
    }
    if (m === 10) {
      return;
    }
    solve(n, m + 1, t_list);
    solve(n - 1, m + 1, t_list.concat([t_point[m]]));
  }
  
  solve(4, 0, []);
  
  var container = document.querySelector('.container');
    for (var i = 0; i < min_t_list.length; i++) {
        var marker = document.createElement('div');
        marker.classList.add('marker');
        // solve 함수에서 반환하는 좌표에 따라 마커의 위치를 설정합니다.
        marker.style.left = container.clientWidth/5 +min_t_list[i][0]*60 + 'px'; // x 좌표
        marker.style.top = container.clientHeight*19/20-min_t_list[i][1]*60 + 'px'; // y 좌표
        container.appendChild(marker);
    }
  