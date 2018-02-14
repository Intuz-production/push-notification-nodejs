--
-- Table structure for table `notifications`
--
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1: active, 2: delete',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1: like, 2: comment, 3: send request, 4: accept request,5:broadcast',
  `message` varchar(255) NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 - no, 1 - yes',
  `created_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications` ADD PRIMARY KEY (`id`);


--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


