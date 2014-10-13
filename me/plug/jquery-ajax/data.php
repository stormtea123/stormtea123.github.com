<?php
	//实际应用中 data 一般从数据库读取
	$data = array();
	$data[] = (object)array('image'=>'images/1.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/2.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/3.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/4.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/5.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/6.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/7.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/8.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/9.jpg',  'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/10.jpg', 'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/11.jpg', 'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/12.jpg', 'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/13.jpg', 'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/14.jpg', 'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	$data[] = (object)array('image'=>'images/15.jpg', 'title'=>'亚洲最早建立的、具有广泛影响的专业音乐团体，是中国交响乐的发源地');
	// 随机抽取9条记录以模拟实际情况
	$keys = array_rand($data, 9);
	$json = array();
	foreach($keys as $key)
	{
		$json[] = $data[$key];
	}
	echo json_encode( $json );

?>